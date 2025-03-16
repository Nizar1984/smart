import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const docData = [
	{
		docName: 'Passport',
		docOwner: 'Nizar نزار كونانشيري',
		docExp: '02-01-2028',
		notifyBefore: 180,
		category: 'Employee',
		docloc: './pizzas/passport.png',
		status: true,
		company: 'Breezoft Documents Clearing',
	},
	{
		docName: 'Emirates ID',
		docOwner: 'Nizar',
		docExp: '05-03-2027',
		notifyBefore: 15,
		category: 'Employee',
		docloc: './pizzas/id.png',
		status: true,
		company: 'Breezoft Documents Clearing',
	},
	{
		docName: 'Residence',
		docOwner: 'Nizar',
		docExp: '05-03-2027',
		notifyBefore: 15,
		category: 'Employee',
		docloc: './pizzas/residence.png',
		status: true,
		company: 'Breezoft Documents Clearing',
	},
	{
		docName: 'Insurance',
		docOwner: 'Nizar',
		docExp: '26-04-2025',
		notifyBefore: 2,
		category: 'Employee',
		docloc: './pizzas/insurance.png',
		status: true,
		company: 'Breezoft Documents Clearing',
	},
	{
		docName: 'Mulkia',
		docOwner: 'car-AD 83933',
		docExp: '20-03-2025',
		notifyBefore: 2,
		category: 'Vehicle',
		docloc: './pizzas/mulkia.jpg',
		status: true,
		company: 'Awan Typing Center',
	},
	{
		docName: 'License',
		docOwner: 'Employee',
		docExp: '09-11-2026',
		notifyBefore: 2,
		category: 'Employee',
		docloc: './pizzas/license.jpg',
		status: true,
		company: 'Awan Typing Center',
	},
];

function App() {
	return (
		<div className='container'>
			<Header />
			<DocumentList />

			{/* <Documents />
			<Footer /> */}
		</div>
	);
}

function Header() {
	return <h1>Smart Doc</h1>;
}
function DocumentList() {
	return (
		<div className='menu'>
			<h2>Your Documents</h2>
			<Docs />
		</div>
	);
}

function Docs(props) {
	const sortedDocs = [...docData].sort((a, b) => {
		const [dayA, monthA, yearA] = a.docExp.split('-');
		const [dayB, monthB, yearB] = b.docExp.split('-');

		const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
		const dateB = new Date(`${yearB}-${monthB}-${dayB}`);

		return dateA - dateB; // Sort ascending (earliest first)
	});
	return sortedDocs.length > 0 ? (
		<>
			<p className='notice'>
				{' '}
				Your Documnents are being displayed and sorted by date of
				expiry. The documents are not active will not be displayed
			</p>
			<ul className='docs'>
				{sortedDocs.map((doc) => (
					<Document docObj={doc} key={doc.docName} />
				))}
			</ul>
		</>
	) : null;
}
function Document({docObj}) {
	// if (!docObj.status) {
	// 	return <p>Command</p> // If status is false, return "Command"
	// }
	const today = new Date();
	const [day, month, year] = docObj.docExp.split('-');
	const expiryDate = new Date(`${year}-${month}-${day}`);
	const timeDiff = expiryDate - today;
	const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
	return docObj.status ? (
		<li>
			<img src={docObj.docloc} alt={docObj.docName} />
			<h3 className='docDetails'>Document : {docObj.docName}  : وثيقة </h3>
			<h3 className='docDetails'>Name : {docObj.docOwner}</h3>
			<h3 className='docDetails'> Expiring : {docObj.docExp}</h3>
			<h3 className='docDetails'>
				Count Down : {daysRemaining} days remaining
			</h3>
			<h3 className='docDetails'>Company / Sponsor : {docObj.company} </h3>
			<p>Notification will be send {docObj.notifyBefore} days before</p>
			<p>type of document: {docObj.category}</p>
		</li>
	) : null;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
