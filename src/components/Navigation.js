import { Link } from "react-router-dom"

function Navigation() {

    return (
        <>
            <div className="container">
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            Home
                        </Link>
                        <Link className="navbar-brand" to="/profile">
                            ProfilePage
                        </Link>
                        <Link className="navbar-brand" to="/newList">
                            Movies and TV Shows
                        </Link>
                        <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navigation;