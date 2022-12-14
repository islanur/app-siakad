import Footer from './Footer';
import './globals.css';
import Header from './Header';

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head />
			<body>
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
