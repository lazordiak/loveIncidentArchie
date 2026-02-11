import "./DepartmentSeal.css";

function DepartmentSeal() {
  return (
    <div className="seal">
      <span className="seal-line">NYC</span>
      <span className="seal-line seal-line--dept">
        Department of Tenderness
      </span>
      <div className="seal-divider" />
      <span className="seal-line seal-line--div">Civic Affection Division</span>
      <span className="seal-line seal-line--est">Est. 1974</span>
    </div>
  );
}

export default DepartmentSeal;
