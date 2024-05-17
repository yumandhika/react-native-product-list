import ShoppingCart from '../Screens/Cart';
import HomeScreen from '../Screens/Home';
import ProductDetail from '../Screens/Product/Detail';
import ProductList from '../Screens/Product/List';

const navigationList = [
  {
    routeType: 'public',
    path: 'Home',
    components: HomeScreen,
    exact: true,
  },
  {
    routeType: 'public',
    path: 'ProductList',
    components: ProductList,
    exact: true,
  },
  {
    routeType: 'private',
    path: 'ProductDetail',
    components: ProductDetail,
    exact: true,
  },
  {
    routeType: 'private',
    path: 'ShoppingCart',
    components: ShoppingCart,
    exact: true,
  },
];

export default navigationList;
