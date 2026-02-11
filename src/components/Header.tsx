import './Header.css'

function Header() {
  return (
    <div className="muni-header">
      <div className="muni-header-inner">
        <span className="muni-header-item muni-header-city">NYC.gov</span>
        <span className="muni-header-sep">|</span>
        <span className="muni-header-item">NYC Resources</span>
        <span className="muni-header-sep">|</span>
        <span className="muni-header-item">311</span>
        <span className="muni-header-sep">|</span>
        <span className="muni-header-item">Office of the Mayor</span>
      </div>
    </div>
  )
}

export default Header
