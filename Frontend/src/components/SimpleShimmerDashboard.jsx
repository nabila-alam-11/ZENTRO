const SimpleShimmerDashboard = () => {
  return (
    <div className="shimmer-wrapper">
      {/* <!-- Summary Cards --> */}
      <div className="card-row">
        <div className="shimmer-box"></div>
        <div className="shimmer-box"></div>
        <div className="shimmer-box"></div>
      </div>

      {/* <!-- Lead Status Boxes --> */}
      <div className="status-row">
        <div className="shimmer-box small"></div>
        <div className="shimmer-box small"></div>
        <div className="shimmer-box small"></div>
        <div className="shimmer-box small"></div>
        <div className="shimmer-box small"></div>
        <div className="shimmer-box small"></div>
      </div>

      {/* <!-- Quick Actions --> */}
      <div className="card-row">
        <div className="shimmer-box"></div>
        <div className="shimmer-box"></div>
        <div className="shimmer-box"></div>
      </div>

      {/* <!-- Lead List --> */}
      <div className="lead-list">
        <div className="lead-item"></div>
        <div className="lead-item"></div>
        <div className="lead-item"></div>
        <div className="lead-item"></div>
        <div className="lead-item"></div>
        <div className="lead-item"></div>
        <div className="lead-item"></div>
        <div className="lead-item"></div>
      </div>
    </div>
  );
};

export default SimpleShimmerDashboard;
