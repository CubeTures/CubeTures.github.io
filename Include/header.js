let path = window.location.pathname;
let page = path.split("/").pop();
page = page.substring(0, page.indexOf("."));
let isClasswork = page == "principles" || page == "data_structures" || page == "independent_studies" || page == "unity";
let isPersonal = page == "collaborative" || page == "unpublished" || page == "published";
` + (page == "education" ? " active" : "") + `;

let appHeader = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav mx-auto">
        <a class="navbar-brand" href="#">Owen Shadburne</a>
        <li class="nav-item">
          <a class="nav-link` + (page == "index" ? " active" : "") + `" aria-current="page" href="/index.html">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link` + (page == "education" ? " active" : "") + `" href="/Pages/education.html">Education</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link` + (isClasswork ? " active" : "") + ` dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Classwork
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item disabled" href="#">High School</a></li>
            <li><a class="dropdown-item` + (page == "principles" ? " active" : "") + `" href="/Pages/Class/principles.html">Principles</a></li>
            <li><a class="dropdown-item` + (page == "data_structures" ? " active" : "") + `" href="/Pages/Class/data_structures.html">Data Structures</a></li>
            <li><a class="dropdown-item` + (page == "independent_studies" ? " active" : "") + `" href="/Pages/Class/independent_studies.html">Independent Studies</a></li>
            <li><a class="dropdown-item` + (page == "unity" ? " active" : "") + `" href="/Pages/Class/unity.html">Unity</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item disabled" href="#">College</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link` + (isPersonal ? " active" : "") + ` dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Personal Projects
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item` + (page == "unpublished" ? " active" : "") + `" href="/Pages/Personal/unpublished.html">Unpublished</a></li>
            <li><a class="dropdown-item` + (page == "published" ? " active" : "") + `" href="/Pages/Personal/published.html">Published</a></li>
            <li><a class="dropdown-item` + (page == "collaborative" ? " active" : "") + `" href="/Pages/Personal/collaborative.html">Collaborative</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link` + (page == "contact" ? " active" : "") + `" href="/Pages/contact.html">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
`;
document.getElementById("app-header").innerHTML = appHeader;