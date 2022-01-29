import { AppBar, Toolbar, Typography } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import useRouter from '../hooks/useRouter'
import { useAuth } from '../hooks/useAuth'
import { currentUserAtom } from '../store/user';
import WhatshotIcon from '@mui/icons-material/Whatshot';
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
      <AppBar position="fixed" className={"bg-white"}>
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1, color: 'black', cursor: 'pointer' }} onClick={() => router.navigate('/')}>
              <WhatshotIcon />
              </Typography>
                <Link className="text-decoration-none mx-3 text-dark" to="/shop">Shop</Link>
                <Link className="text-decoration-none mx-3 text-dark" to="/contact">Contact</Link>
                {
                  currentUser ? 
                  <div className="text-dark mx-3" style={{cursor: 'pointer'}} onClick={Logout}>Logout</div>
                    :
                    <Link className="text-decoration-none mx-3 text-dark" to="/sign">Sign</Link>
                }
              <div style={{cursor: 'pointer'}}><CartIcon /></div>
              { cartHidden ? null : <CartDropdown />}
        </Toolbar>
      </AppBar>
  );
}

export default Header;