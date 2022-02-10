import Header from './Header';
import Footer from './Footer';

function App({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
    );
}

export default App;