//if page loaded == college => college becomes active

let appHeader = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Owen Shadburne</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/index.html">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Pages/education.html">Education</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Classwork
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item disabled" href="#">High School</a></li>
            <li><a class="dropdown-item" href="/Pages/Class/data_structures.html">Data Structures</a></li>
            <li><a class="dropdown-item" href="/Pages/Class/independent_studies.html">Independent Studies</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item disabled" href="#">College</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Personal Projects
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/Pages/Personal/unpublished.html">Unpublished</a></li>
            <li><a class="dropdown-item" href="/Pages/Personal/published.html">Published</a></li>
            <li><a class="dropdown-item" href="/Pages/Personal/collaborative.html">Collaborative</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Pages/contact.html">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
`;
document.getElementById("app-header").innerHTML = appHeader;