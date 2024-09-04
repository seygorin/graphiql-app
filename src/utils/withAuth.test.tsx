import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ROUTES from '../shared/types/types';
import withAuth from './withAuth';

// // Mock dependencies
// vi.mock('next/navigation', () => ({
//   useRouter: vi.fn(),
// }));
//
// vi.mock('react-firebase-hooks/auth', () => ({
//   useAuthState: vi.fn(),
// }));
//
// vi.mock('firebase/auth', () => ({
//   onIdTokenChanged: vi.fn(),
//   auth: {},
// }));
//
// vi.mock('components/Loader', () => ({
//   default: () => <div data-testid="loader">Loader</div>,
// }));
//
// vi.mock('../lib/auth', () => ({
//   signOutUser: vi.fn(),
// }));
//
// const MockComponent = () => <div data-testid="mock-component">Mock Component</div>;
//
// describe('withAuth', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });
//
//   it('should render Loader when loading', () => {
//     (useAuthState as vi.Mock).mockReturnValue([null, true]);
//     const WrappedComponent = withAuth(MockComponent);
//     render(<WrappedComponent />);
//     expect(screen.getByTestId('loader')).toBeInTheDocument();
//   });
//
//   it('should redirect to MAIN_PAGE when user is not authenticated', async () => {
//     (useAuthState as vi.Mock).mockReturnValue([null, false]);
//     const pushMock = vi.fn();
//     (useRouter as vi.Mock).mockReturnValue({ replace: pushMock });
//     const WrappedComponent = withAuth(MockComponent);
//     render(<WrappedComponent />);
//     await waitFor(() => expect(pushMock).toHaveBeenCalledWith(ROUTES.MAIN_PAGE));
//   });
//
//   it('should render the wrapped component when user is authenticated', () => {
//     (useAuthState as vi.Mock).mockReturnValue([{ uid: '123' }, false]);
//     const WrappedComponent = withAuth(MockComponent);
//     render(<WrappedComponent />);
//     expect(screen.getByTestId('mock-component')).toBeInTheDocument();
//   });
//
//   it('should handle token expiration and sign out user', async () => {
//     const user = {
//       getIdTokenResult: vi.fn().mockResolvedValue({ expirationTime: new Date(Date.now() + 1000).toISOString() }),
//     };
//     (useAuthState as vi.Mock).mockReturnValue([user, false]);
//     const signOutUserMock = vi.fn();
//     vi.mock('../lib/auth', () => ({
//       signOutUser: signOutUserMock,
//     }));
//     const pushMock = vi.fn();
//     (useRouter as vi.Mock).mockReturnValue({ push: pushMock });
//     const WrappedComponent = withAuth(MockComponent);
//     render(<WrappedComponent />);
//     await waitFor(() => expect(signOutUserMock).toHaveBeenCalled());
//     expect(pushMock).toHaveBeenCalledWith(ROUTES.MAIN_PAGE);
//   });
// });

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  onIdTokenChanged: vi.fn(),
  auth: {},
}));

vi.mock('components/Loader', () => ({
  default: () => <div data-testid="loader">Loader</div>,
}));

vi.mock('../lib/auth', () => ({
  signOutUser: vi.fn(),
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

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
  NextIntlClientProvider: ({ children }) => children,
}));

const MockComponent = () => <div data-testid="mock-component">Mock Component</div>;

const messages = {
  'form.title.signIn': 'Sign In',
  'form.email': 'Email',
  'form.password': 'Password',
  'form.button.signIn': 'Sign In',
};

describe('withAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useTranslations as vi.Mock).mockReturnValue((key: string) => key);
  });

  it('should render Loader when loading', () => {
    (useAuthState as vi.Mock).mockReturnValue([null, true]);
    const WrappedComponent = withAuth(MockComponent);
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <WrappedComponent />
      </NextIntlClientProvider>,
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should redirect to MAIN_PAGE when user is not authenticated', async () => {
    (useAuthState as vi.Mock).mockReturnValue([null, false]);
    const pushMock = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({ replace: pushMock });
    const WrappedComponent = withAuth(MockComponent);
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <WrappedComponent />
      </NextIntlClientProvider>,
    );
    await waitFor(() => expect(pushMock).toHaveBeenCalledWith(ROUTES.MAIN_PAGE));
  });

  it('should render the wrapped component when user is authenticated', () => {
    (useAuthState as vi.Mock).mockReturnValue([{ uid: '123' }, false]);
    const WrappedComponent = withAuth(MockComponent);
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <WrappedComponent />
      </NextIntlClientProvider>,
    );
    expect(screen.getByTestId('mock-component')).toBeInTheDocument();
  });

  // it('should handle token expiration and sign out user', async () => {
  //   const user = {
  //     getIdTokenResult: vi.fn().mockResolvedValue({ expirationTime: new Date(Date.now() + 1000).toISOString() }),
  //   };
  //   (useAuthState as vi.Mock).mockReturnValue([user, false]);
  //   const signOutUserMock = (await import('../lib/auth')).signOutUser;
  //   const pushMock = vi.fn();
  //   (useRouter as vi.Mock).mockReturnValue({ push: pushMock });
  //   const WrappedComponent = withAuth(MockComponent);
  //   render(
  //       <NextIntlClientProvider locale="en" messages={messages}>
  //         <WrappedComponent />
  //       </NextIntlClientProvider>,
  //   );
  //   await waitFor(() => expect(signOutUserMock).toHaveBeenCalled());
  //   expect(pushMock).toHaveBeenCalledWith(ROUTES.MAIN_PAGE);
  // });
});

//
// //////////////////////////////////////////////////////////////////////////////////////
//
//
// import { vi, describe, beforeEach, afterEach, test, expect } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import withAuth from './withAuth'; // Adjust the import according to your file structure
// import { auth } from '../lib/firebase';
// import { User } from 'firebase/auth';
// import { useRouter } from 'next/navigation'; // Correct import
// import { NextIntlClientProvider, useTranslations } from 'next-intl';
//
// vi.mock('components/Loader', () => ({
//   default: () => <div>Loading...</div>,
// }));
//
// // Mock useRouter
// vi.mock('next/navigation', () => ({
//   useRouter: vi.fn(),
// }));
//
// vi.mock('next-intl', () => ({
//   useTranslations: vi.fn(),
//   NextIntlClientProvider: ({ children }) => children,
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
//     callback({
//       getIdTokenResult: vi.fn().mockResolvedValue({
//         expirationTime: new Date(Date.now() + 10000).toISOString(), // Token valid for 10 seconds
//       }),
//     });
//     return vi.fn(); // Return unsubscribe function
//   }),
// }));
//
// const MockComponent = () => <div>Protected Content</div>;
// const WrappedComponent = withAuth(MockComponent);
//
// const messages = {
//   'form.title.signIn': 'Sign In',
//   'form.email': 'Email',
//   'form.password': 'Password',
//   'form.button.signIn': 'Sign In',
// };
//
// describe('withAuth HOC', () => {
//   let user: User | null = null;
//
//   beforeEach(() => {
//     (useTranslations as vi.Mock).mockReturnValue((key: string) => key);
//     user = {
//       getIdTokenResult: vi.fn().mockResolvedValue({
//         expirationTime: new Date(Date.now() + 10000).toISOString(),
//       }),
//     } as unknown as User;
//
//     // Mock useAuthState to simulate user state
//     vi.spyOn(require('react-firebase-hooks/auth'), 'useAuthState').mockReturnValue([user, false]);
//
//     // Mock the router
//     (useRouter as jest.Mock).mockReturnValue({
//       push: vi.fn(),
//       replace: vi.fn(),
//       query: {},
//       pathname: '/',
//       asPath: '/',
//       isFallback: false,
//     });
//
//     vi.useFakeTimers();
//   });
//
//   afterEach(() => {
//     vi.clearAllMocks();
//     vi.useRealTimers();
//   });
//
//   test('clears timeout on unmount', () => {
//     const { unmount } = render(
//         <NextIntlClientProvider locale="en" messages={messages}>
//           <WrappedComponent />
//         </NextIntlClientProvider>,
//     );
//
//
//
//     // Simulate the passage of time to trigger the timeout
//     vi.advanceTimersByTime(10000); // Advance time by 10 seconds
//
//     // Unmount the component
//     unmount();
//
//     // Check if the component is no longer in the document
//     expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
//   });
// });
