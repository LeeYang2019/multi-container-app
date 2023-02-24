import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function Fib() {
	const [seenIndexes, setSeenIndexes] = useState([]);
	const [values, setValues] = useState({});
	const [index, setIndex] = useState('');

	const fetchValues = useCallback(async () => {
		try {
			const { data } = await axios.get('/api/values/current');
			setValues(data);
		} catch (error) {
			console.log(error);
		}
	}, []);

	const fetchIndexes = useCallback(async () => {
		try {
			const { data } = await axios.get('/api/values/all');
			setSeenIndexes(data);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		fetchValues();
		fetchIndexes();
	}, [fetchValues, fetchIndexes]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await axios.post('/api/values', {
				index: index,
			});
			setIndex('');
		} catch (error) {
			console.log(error);
		}
	};

	const renderSeenIndexesList = () => {
		return seenIndexes.map(({ number }) => number).join(', ');
	};

	const renderCalculatedValues = () => {
		const entries = [];

		for (let key in values) {
			entries.push(
				<div key={key}>
					For index {key} I calculated {values[key]}
				</div>
			);
		}

		return entries.length ? entries : <div>No values calculated yet</div>;
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>Enter your index:</label>
				<input
					value={index}
					onChange={(event) => setIndex(event.target.value)}
				/>
				<button>Submit</button>
			</form>

			<h3>Indexes I have seen:</h3>
			{seenIndexes.length ? (
				renderSeenIndexesList()
			) : (
				<div>No indexes seen yet</div>
			)}

			<h3>Calculated Values:</h3>
			{renderCalculatedValues()}
		</div>
	);
}

export default Fib;
