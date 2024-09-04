// import { useRouter } from 'next/navigation';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { render, screen } from '@testing-library/react';
// import { User } from 'firebase/auth';
// import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
// import ProtectedAuthRoute from './ProtectedAuthRoute';
//
// vi.mock('react-firebase-hooks/auth', () => ({
//   useAuthState: vi.fn(),
// }));
//
// vi.mock('next/navigation', () => ({
//   useRouter: vi.fn(),
// }));
//
// vi.mock('components/Loader', () => ({
//   default: () => <div>Loading...</div>,
// }));
//
// vi.mock('../../shared/types/types', () => ({
//   default: {
//     MAIN_PAGE: '/',
//   },
// }));
//
// vi.mock('firebase/auth', () => ({
//   GoogleAuthProvider: vi.fn(),
//   createUserWithEmailAndPassword: vi.fn(),
//   signInWithEmailAndPassword: vi.fn(),
//   signInWithPopup: vi.fn(),
//   signOut: vi.fn(),
//   getAuth: vi.fn(),
//   onIdTokenChanged: vi.fn((auth, callback) => {
//     callback({ getIdTokenResult: vi.fn() });
//     return () => {};
//   }),
// }));
//
// describe('ProtectedAuthRoute', () => {
//   let user: User | null = null;
//
//   beforeEach(() => {
//     vi.spyOn(require('react-firebase-hooks/auth'), 'useAuthState').mockReturnValue([user, false]);
//     (useRouter as vi.Mock).mockReturnValue({
//       push: vi.fn(),
//     });
//   });
//
//   afterEach(() => {
//     vi.clearAllMocks();
//   });
//
//   test('renders children when user is not authenticated', () => {
//     user = null;
//     (useAuthState as vi.Mock).mockReturnValue([user, false]);
//     render(
//       <ProtectedAuthRoute>
//         <div>Protected Content</div>
//       </ProtectedAuthRoute>,
//     );
//     expect(screen.getByText('Protected Content')).toBeInTheDocument();
//   });
//
//   test('redirects to main page when user is authenticated', () => {
//     user = { uid: '123' } as User;
//     (useAuthState as vi.Mock).mockReturnValue([user, false]);
//     render(
//       <ProtectedAuthRoute>
//         <div>Protected Content</div>
//       </ProtectedAuthRoute>,
//     );
//     expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
//     expect(useRouter().push).toHaveBeenCalledWith('/');
//   });
//
//   test('renders loader when loading', () => {
//     (useAuthState as vi.Mock).mockReturnValue([null, true]);
//     render(
//       <ProtectedAuthRoute>
//         <div>Protected Content</div>
//       </ProtectedAuthRoute>,
//     );
//     expect(screen.getByText('Loading...')).toBeInTheDocument();
//     expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
//   });
// });
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { render, screen } from '@testing-library/react';
import { User } from 'firebase/auth';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import ProtectedAuthRoute from './ProtectedAuthRoute';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('components/Loader', () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock('../../shared/types/types', () => ({
  default: {
    MAIN_PAGE: '/',
  },
}));

vi.mock('firebase/auth', () => ({
  GoogleAuthProvider: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
  getAuth: vi.fn(),
  onIdTokenChanged: vi.fn((auth, callback) => {
    callback({ getIdTokenResult: vi.fn() });
    return () => {};
  }),
}));

describe('ProtectedAuthRoute', () => {
  let user: User | null = null;
  const mockedUseRouter = useRouter as vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuthState as vi.Mock).mockReturnValue([user, false]);
    mockedUseRouter.mockReturnValue({
      push: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders children when user is not authenticated', () => {
    user = null;
    (useAuthState as vi.Mock).mockReturnValue([user, false]);
    render(
      <ProtectedAuthRoute>
        <div>Protected Content</div>
      </ProtectedAuthRoute>,
    );
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  test('redirects to main page when user is authenticated', () => {
    user = { uid: '123' } as User;
    (useAuthState as vi.Mock).mockReturnValue([user, false]);
    render(
      <ProtectedAuthRoute>
        <div>Protected Content</div>
      </ProtectedAuthRoute>,
    );
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(mockedUseRouter().push).toHaveBeenCalledWith('/');
  });

  test('renders loader when loading', () => {
    (useAuthState as vi.Mock).mockReturnValue([null, true]);
    render(
      <ProtectedAuthRoute>
        <div>Protected Content</div>
      </ProtectedAuthRoute>,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});
