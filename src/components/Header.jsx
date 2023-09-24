import "./Header.css"

const Header = ({handleSearchChange}) => {
  return <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom shadow px-5 fixed-top bg-light ">
  <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none gap-2">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbiEm5-6iHtPHTyoRgDkjyporpjsIO9JemxA&usqp=CAU" />
    <h1 className="fs-4">BookStore</h1>
  </a>

  <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
    <input type="search" className="form-control form-control-dark" placeholder="Search Books..." aria-label="Search" onChange={handleSearchChange}  />
  </form>
</header>
}

export default Header;