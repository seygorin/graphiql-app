'use client';

import withAuth from 'utils/withAuth';

const Dashboard = () => {
  return (
    // <ProtectedRoute> // variant 2 using Protected Route
    <>THIS ROUTE IS PROTECTED</>
    // </ProtectedRoute> // variant 2 using Protected Route
  );
};

export default withAuth(Dashboard); // variant 1 using withAuth HOC
// export default Dashboard; // variant 2 using Protected Route
