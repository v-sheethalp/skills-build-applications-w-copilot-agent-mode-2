import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <h1 className="display-4 fw-bold">OctoFit Tracker</h1>
          <p className="lead text-muted">
            A modern multi-tier fitness app for logging workouts, building teams,
            and tracking progress in one place.
          </p>
          <div className="d-flex gap-3">
            <a className="btn btn-primary btn-lg" href="#features">
              Explore features
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="#api-status">
              API status
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h4">Ready for launch</h2>
              <p className="mb-0 text-muted">
                React 19 + Vite is running on port 5173, and the backend API is
                ready on port 8000.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section id="features" className="row mt-5 g-4">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h3 className="h5">Activity logging</h3>
              <p className="text-muted mb-0">Capture workouts and monitor your streaks.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h3 className="h5">Team challenges</h3>
              <p className="text-muted mb-0">Create teams and compete on the leaderboard.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h3 className="h5">Smart suggestions</h3>
              <p className="text-muted mb-0">Get tailored recommendations based on your goals.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="api-status" className="mt-5">
        <div className="alert alert-success mb-0" role="status">
          Backend health endpoint: /api/health
        </div>
      </section>
    </main>
  )
}

export default App
