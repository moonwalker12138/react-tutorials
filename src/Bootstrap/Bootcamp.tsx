import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "mapbox-gl/src/css/mapbox-gl.css";

export const Bootcamp = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
                <div className="container">
                    <a href="#" className="navbar-brand">
                        Frontend Bootcamp
                    </a>
                    <button
                        className="navbar-toggler"
                        data-bs-toggle="collapse"
                        data-bs-target="#navmenu"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navmenu">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a href="#learn" className="nav-link">
                                    What You'll Learn
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#questions" className="nav-link">
                                    Questions
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#instructors" className="nav-link">
                                    Instructors
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <section className="bg-dark text-light p-5 p-lg-0 text-center text-sm-start">
                <div className="container">
                    <div className="d-sm-flex align-items-center justify-content-between">
                        <div>
                            <h1>
                                Become a{" "}
                                <span className="text-warning">
                                    Web Developer
                                </span>
                            </h1>
                            <p className="lead my-4">
                                {
                                    "Anyone Have any idea how I can troubleshoot the map. Ive checked everything, including the mapbox docs. Everything is correct from what I can tell. I get the hand icon when I hover over, but its just white space. Map doesn't visibly showE"
                                }
                            </p>
                            <button
                                className="btn btn-primary btn-lg"
                                data-bs-toggle="modal"
                                data-bs-target="#modal"
                            >
                                Start The Enrollment
                            </button>
                        </div>
                        <img
                            src={logo}
                            alt=""
                            className="img-fluid w-50 d-none d-sm-block"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-primary text-light p-5">
                <div className="container">
                    <div className="d-md-flex justify-content-between align-items-center">
                        <h3 className="mb-3 mb-md-0">
                            Sign Up For Our Newsletter
                        </h3>
                        <div
                            className="input-group news-input"
                            style={{ width: "50%" }}
                        >
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Email"
                            />
                            <button className="btn btn-dark btn-lg">
                                Button
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="p-5">
                <div className="container">
                    <div className="row text-center g-4">
                        <div className="col-md">
                            <div className="card bg-dark text-light">
                                <div className="card-body text-center">
                                    <div className="h1 mb-3">
                                        <i className="bi bi-laptop"></i>
                                    </div>
                                    <h3 className="card-title mb-3">Virtual</h3>
                                    <p className="card-text">
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit. Et aut eum similique.
                                        Quasi, excepturi non.
                                    </p>
                                    <a href="#" className="btn btn-primary">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="card bg-secondary text-light">
                                <div className="card-body text-center">
                                    <div className="h1 mb-3">
                                        <i className="bi bi-person-square"></i>
                                    </div>
                                    <h3 className="card-title mb-3">Hybrid</h3>
                                    <p className="card-text">
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit. Et aut eum similique.
                                        Quasi, excepturi non.
                                    </p>
                                    <a href="#" className="btn btn-dark">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="card bg-dark text-light">
                                <div className="card-body text-center">
                                    <div className="h1 mb-3">
                                        <i className="bi bi-people"></i>
                                    </div>
                                    <h3 className="card-title mb-3">
                                        In Person
                                    </h3>
                                    <p className="card-text">
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit. Et aut eum similique.
                                        Quasi, excepturi non.
                                    </p>
                                    <a href="#" className="btn btn-primary">
                                        Read More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="learn" className="p-5">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-md">
                            <img src={logo} alt="" className="img-fluid" />
                        </div>
                        <div className="col-md p-5">
                            <h2>Learn The Fundamentals</h2>
                            <p className="lead">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Dolores iste, architecto totam
                                beatae eveniet ipsa?
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Eaque eos esse nemo sit minima
                                velit id modi, laboriosam nihil ipsam! Quam
                                velit quibusdam modi sapiente tempore rerum
                                voluptatem eveniet ea.
                            </p>
                            <a href="#" className="btn btn-light mt-3">
                                <i className="bi bi-chevron-right">Read More</i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="learn" className="p-5 bg-dark text-light">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-md p-5">
                            <h2>Learn React</h2>
                            <p className="lead">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Dolores iste, architecto totam
                                beatae eveniet ipsa?
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Eaque eos esse nemo sit minima
                                velit id modi, laboriosam nihil ipsam! Quam
                                velit quibusdam modi sapiente tempore rerum
                                voluptatem eveniet ea.
                            </p>
                            <a href="#" className="btn btn-light mt-3">
                                <i className="bi bi-chevron-right">Read More</i>
                            </a>
                        </div>
                        <div className="col-md">
                            <img src={logo} alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="questions" className="p-5">
                <div className="container">
                    <h2 className="text-center mb-4">FAQ</h2>
                    <div
                        className="accordion accordion-flush"
                        id="accordionFlushExample"
                    >
                        <div className="accordion-item">
                            <h2
                                className="accordion-header"
                                id="flush-headingOne"
                            >
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseOne"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseOne"
                                >
                                    Accordion Item #1
                                </button>
                            </h2>
                            <div
                                id="flush-collapseOne"
                                className="accordion-collapse collapse"
                                aria-labelledby="flush-headingOne"
                                data-bs-parent="#accordionFlushExample"
                            >
                                <div className="accordion-body">
                                    Placeholder content for this accordion,
                                    which is intended to demonstrate the{" "}
                                    <code>.accordion-flush</code> class. This is
                                    the first item's accordion body.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2
                                className="accordion-header"
                                id="flush-headingTwo"
                            >
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseTwo"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseTwo"
                                >
                                    Accordion Item #2
                                </button>
                            </h2>
                            <div
                                id="flush-collapseTwo"
                                className="accordion-collapse collapse"
                                aria-labelledby="flush-headingTwo"
                                data-bs-parent="#accordionFlushExample"
                            >
                                <div className="accordion-body">
                                    Placeholder content for this accordion,
                                    which is intended to demonstrate the{" "}
                                    <code>.accordion-flush</code> class. This is
                                    the second item's accordion body. Let's
                                    imagine this being filled with some actual
                                    content.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2
                                className="accordion-header"
                                id="flush-headingThree"
                            >
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseThree"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseThree"
                                >
                                    Accordion Item #3
                                </button>
                            </h2>
                            <div
                                id="flush-collapseThree"
                                className="accordion-collapse collapse"
                                aria-labelledby="flush-headingThree"
                                data-bs-parent="#accordionFlushExample"
                            >
                                <div className="accordion-body">
                                    Placeholder content for this accordion,
                                    which is intended to demonstrate the{" "}
                                    <code>.accordion-flush</code> class. This is
                                    the third item's accordion body. Nothing
                                    more exciting happening here in terms of
                                    content, but just filling up the space to
                                    make it look, at least at first glance, a
                                    bit more representative of how this would
                                    look in a real-world application.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="instructor" className="p-5 bg-primary">
                <div className="container">
                    <h2 className="text-center text-white">Our Instructors</h2>
                    <p className="lead text-center text-white mb-5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Doloremque ipsam magnam atque animi, quia dolorum.
                    </p>
                    <div className="row g-4">
                        <div className="col-md-6 col-lg-3">
                            <div className="card bg-light">
                                <div className="card-body text-center">
                                    <img
                                        src="https://randomuser.me/api/portraits/men/11.jpg"
                                        className="rounded-circle mb-3"
                                        alt=""
                                    />
                                    <h3 className="card-title mb-3">
                                        John Doe
                                    </h3>
                                    <p className="card-text">
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit. Laboriosam ratione
                                        unde maiores voluptatibus iure a!
                                    </p>
                                    <a href="#">
                                        <i className="bi bi-twitter text-dark mx-1"></i>
                                    </a>
                                    <a href="#">
                                        <i className="bi bi-facebook text-dark mx-1"></i>
                                    </a>
                                    <a href="#">
                                        <i className="bi bi-linkedin text-dark mx-1"></i>
                                    </a>
                                    <a href="#">
                                        <i className="bi bi-instagram text-dark mx-1"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="card bg-light">
                                <div className="card-body text-center">
                                    <img
                                        src="https://randomuser.me/api/portraits/women/11.jpg"
                                        className="rounded-circle mb-3"
                                        alt=""
                                    />
                                    <h3 className="card-title mb-3">
                                        Jane Doe
                                    </h3>
                                    <p className="card-text">
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit. Laboriosam ratione
                                        unde maiores voluptatibus iure a!
                                    </p>
                                    <a href="#">
                                        <i className="bi bi-twitter text-dark mx-1"></i>
                                    </a>
                                    <a href="#">
                                        <i className="bi bi-facebook text-dark mx-1"></i>
                                    </a>
                                    <a href="#">
                                        <i className="bi bi-linkedin text-dark mx-1"></i>
                                    </a>
                                    <a href="#">
                                        <i className="bi bi-instagram text-dark mx-1"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="card bg-light">
                                <div className="card-body text-center">
                                    <img
                                        src="https://randomuser.me/api/portraits/men/12.jpg"
                                        className="rounded-circle mb-3"
                                        alt=""
                                    />
                                    <h3 className="card-title mb-3">
                                        Steve Smith
                                    </h3>
                                    <p className="card-text">
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit. Laboriosam ratione
                                        unde maiores voluptatibus iure a!
                                    </p>
                                    <a href="#">
                                        <i className="bi bi-twitter text-dark mx-1"></i>
                                    </a>
                                    <a href="#">
                                        <i className="bi bi-facebook text-dark mx-1"></i>
                                    </a>
                                    <a href="#">
                                        <i className="bi bi-linkedin text-dark mx-1"></i>
                                    </a>
                                    <a href="#">
                                        <i className="bi bi-instagram text-dark mx-1"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="card bg-light">
                                <div className="card-body text-center">
                                    <img
                                        src="https://randomuser.me/api/portraits/women/12.jpg"
                                        className="rounded-circle mb-3"
                                        alt=""
                                    />
                                    <h3 className="card-title mb-3">
                                        Sara Smith
                                    </h3>
                                    <p className="card-text">
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit. Laboriosam ratione
                                        unde maiores voluptatibus iure a!
                                    </p>
                                    <a href="#">
                                        <i className="bi bi-twitter text-dark mx-1"></i>
                                    </a>
                                    <a href="#">
                                        <i className="bi bi-facebook text-dark mx-1"></i>
                                    </a>
                                    <a href="#">
                                        <i className="bi bi-linkedin text-dark mx-1"></i>
                                    </a>
                                    <a href="#">
                                        <i className="bi bi-instagram text-dark mx-1"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="p-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md">
                            <h2 className="text-center mb-4">Contact Info</h2>
                            <ul className="list-group list-group-flush lead">
                                <li className="list-group-item">
                                    <span className="fw-bold">
                                        Main Location:
                                    </span>{" "}
                                    50 Main st Boston MA
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bold">
                                        Enrollment Phone:
                                    </span>{" "}
                                    (555) 555-5555
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bold">
                                        Student Phone:
                                    </span>{" "}
                                    (333) 333-3333
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bold">
                                        Enrollment Email:
                                    </span>{" "}
                                    (555) enroll@frontendbc.test
                                </li>
                                <li className="list-group-item">
                                    <span className="fw-bold">
                                        Student Email:
                                    </span>{" "}
                                    (555) student@frontendbc.test
                                </li>
                            </ul>
                        </div>
                        <div className="col-md"></div>
                    </div>
                </div>
            </section>

            <footer className="p-5 bg-dark text-white text-center position-relative">
                <div className="container">
                    <p className="lead">
                        Copyright &copy; 2021 Frontend Bootcamp
                    </p>
                    <a
                        href="#"
                        className="position-absolute bottom-0 end-0 p-5"
                    >
                        <i className="bi bi-arrow-up-circle h1"></i>
                    </a>
                </div>
            </footer>

            <div
                className="modal fade"
                id="modal"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Modal title
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">...</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
