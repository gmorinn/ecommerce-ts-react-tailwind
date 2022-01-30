import { useRecoilState, useRecoilValue } from 'recoil';
import useRouter from '../hooks/useRouter'
import { useAuth } from '../hooks/useAuth'
import { currentUserAtom } from '../store/user';
import WhatshotIcon from '../assets/icons/fire.svg';
import { cartHiddenAtom } from '../store/cart';
import { displayError } from '../utils/toastMessage';
import CartDropdown from './products/CartDropdown';
import CartIcon from './products/CartIcon';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  const router = useRouter()
  const { logout } = useAuth()
  const cartHidden = useRecoilValue(cartHiddenAtom)
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom)

  const Logout = () => {
    setCurrentUser(null)
    logout()
    displayError('Disconnected!');
    router.push('/sign')
  }

  return (
      <nav className="bg-white mb-4">
        <div className="container flex flex-wrap justify-between mx-auto">
          <img src={WhatshotIcon} alt="logo" className='flex w-10 cursor-pointer' onClick={() => router.push('/')}/>
          <div className="hidden w-full md:block md:w-auto">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link className="mx-2 text-dark" to="/shop">Shop</Link>
              </li>
              <li>
                <Link className="mx-2 text-dark" to="/contact">Contact</Link>
              </li>
              <li>
                {
                  currentUser ? 
                  <div className="text-dark mx-3 cursor-pointer" onClick={Logout}>Logout</div>
                    :
                    <Link className="mx-2 text-dark" to="/sign">Sign</Link>
                }
              </li>
              <li>
                <div className='cursor-pointer'><CartIcon /></div>
                  { cartHidden ? null : <CartDropdown />}
              </li>
            </ul>
          </div>
        </div>
    </nav>
  );
}

export default Header;