import InputContainer from "../InputContainer";
import UploadedDoc from "../UploadedDoc";

const PhotographAndDocument = () => {
  return (
    <div className="formConitainer p-4">
      <h4>Photograph And Document</h4>
      <form>
        <form
          className="formContainer formInnerContainer pb-5"
          style={{
            position: "relative",
          }}
        >
          <div
            className="text-white text-center px-3 py-1"
            style={{
              backgroundColor: "grey",
              maxWidth: "fit-content",
              fontSize: ".8rem",
            }}
          >
            Kindly upload all relevant documents as mentioned in the checklist
            item.
          </div>
          <div className="inputContainer">
            <label htmlFor="documentType">
              <span className="required">*</span>Document Type:
            </label>
            <select
              name="documentType"
              id="documentType"
              className="col-6"
              required
            >
              <option value="" disabled selected>
                [Select an Option]
              </option>
              <option value="doc1">doc 1</option>
              <option value="doc2">doc 2</option>
            </select>
          </div>
          <InputContainer
            inputType="text"
            required={true}
            title={"Document Name"} //this name will be the name of the document placeholder in uploaded doc section
          ></InputContainer>
          <InputContainer
            inputType="file"
            required={true}
            title={"Upload Attachment"}
          ></InputContainer>
          <div
            className="buttonContainer"
            style={{
              position: "absolute", // Place the button relative to the form
              bottom: "0px", // 20px above the bottom edge
              right: "0px", // 20px away from the right edge
            }}
          >
            <button className="button buttonNotFilled">Upload</button>
          </div>
        </form>
        <hr />
        <h4>Uploaded Document</h4>
        <div className="p-3 d-flex flex-column">
          <UploadedDoc docName={"doc1"}></UploadedDoc>
          <hr />
          <UploadedDoc docName={"doc2"}></UploadedDoc>
        </div>
        <div className="buttonContainer d-flex justify-content-end mt-4 float-end">
          <button className="button buttonFilled">Save & Proceed</button>
        </div>
      </form>
    </div>
  );
};

export default PhotographAndDocument;
