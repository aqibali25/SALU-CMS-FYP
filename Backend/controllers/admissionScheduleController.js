// controllers/admissionScheduleController.js
const { pool } = require("../db");

// GET: saari admission schedule list
const getAdmissionSchedule = (req, res) => {
  const query = `
    SELECT 
      id,
      start_date,
      end_date,
      admission_form_fee,
      admission_year,
      Shift,
      status
    FROM admission_schedule
    ORDER BY admission_year DESC, id DESC
  `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error("DB error (getAdmissionSchedule):", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
        error: err.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: results,
    });
  });
};

// Calculate status based on start and end dates
const calculateStatus = (startDate, endDate) => {
  if (!startDate || !endDate) return "Closed";

  const currentDate = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Set time to beginning of day for accurate comparison
  currentDate.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  if (currentDate < start) {
    return "Upcoming";
  } else if (currentDate >= start && currentDate <= end) {
    return "Open";
  } else {
    return "Closed";
  }
};

// UPDATE: Update status for all admission schedules based on current date
const updateAdmissionScheduleStatus = (req, res) => {
  // First, get all admission schedules
  const selectQuery = `
    SELECT 
      id,
      start_date,
      end_date
    FROM admission_schedule
  `;

  pool.query(selectQuery, (err, results) => {
    if (err) {
      console.error("DB error (updateAdmissionScheduleStatus - select):", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No admission schedules found to update",
        updatedCount: 0,
      });
    }

    let updatedCount = 0;
    const updatePromises = [];

    // Calculate new status for each record and prepare update queries
    results.forEach((record) => {
      const newStatus = calculateStatus(record.start_date, record.end_date);

      const updateQuery = `
        UPDATE admission_schedule 
        SET status = ? 
        WHERE id = ?
      `;

      updatePromises.push(
        new Promise((resolve, reject) => {
          pool.query(
            updateQuery,
            [newStatus, record.id],
            (updateErr, updateResults) => {
              if (updateErr) {
                console.error(
                  `DB error updating record ${record.id}:`,
                  updateErr
                );
                reject(updateErr);
              } else {
                if (updateResults.affectedRows > 0) {
                  updatedCount++;
                }
                resolve(updateResults);
              }
            }
          );
        })
      );
    });

    // Execute all update queries
    Promise.all(updatePromises)
      .then(() => {
        return res.status(200).json({
          success: true,
          message: "Admission schedule status updated successfully",
          updatedCount: updatedCount,
          totalRecords: results.length,
        });
      })
      .catch((error) => {
        console.error("Error updating admission schedule status:", error);
        return res.status(500).json({
          success: false,
          message: "Error updating admission schedule status",
          error: error.message,
        });
      });
  });
};

// GET: Get admission schedule with calculated status (without updating DB)
const getAdmissionScheduleWithCalculatedStatus = (req, res) => {
  const query = `
    SELECT 
      id,
      start_date,
      end_date,
      admission_form_fee,
      admission_year,
      Shift,
      status
    FROM admission_schedule
    ORDER BY admission_year DESC, id DESC
  `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error(
        "DB error (getAdmissionScheduleWithCalculatedStatus):",
        err
      );
      return res.status(500).json({
        success: false,
        message: "Database error",
        error: err.message,
      });
    }

    // Add calculated status to each record
    const dataWithCalculatedStatus = results.map((record) => ({
      ...record,
      calculated_status: calculateStatus(record.start_date, record.end_date),
    }));

    return res.status(200).json({
      success: true,
      data: dataWithCalculatedStatus,
    });
  });
};

module.exports = {
  getAdmissionSchedule,
  updateAdmissionScheduleStatus,
  getAdmissionScheduleWithCalculatedStatus,
  calculateStatus, // Exporting for testing if needed
};
