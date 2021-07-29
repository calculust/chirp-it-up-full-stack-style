import * as React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import { IChirpDataArray } from '../../types';

const Details = (props: DetailsProps) => {
	const history = useHistory();
	const { id } = useParams<{ id: string }>();
	const [chirp, setChirp] = useState(null);
	const editURL = `/edit/${id}`;

	async function handleDelete() {
		const r = confirm('Are you sure you want to delete?');
		if (r) {
			try {
				console.log(id);
				const res = await fetch(`/api/chirps/${id}`, {
					method: 'DELETE',
					mode: 'same-origin',
				});
				history.push('/');
			} catch (error) {
				console.log(error);
			}			
		}
    }

	useEffect(() => {
		async function getChrip() {
			try {
				const res = await fetch('/api/chirps/' + id);
				const chirpData = await res.json();
				setChirp(chirpData);
			} catch (error) {
				console.log(error);
			}
		}
		getChrip();
	}, []);

	if(!chirp) {
		return (
			<></>
		)
	}

	return (
		<div className="row justify-content-center">
            <div className="col-sm-4">
				<Card key={id} className="rounded-3 mb-3">
					<Card.Body>
						<Card.Title>@{chirp.name.toLowerCase()}</Card.Title>
						<Card.Text>
							{chirp.content}
						</Card.Text>
						<Card.Text className="mb-1">
							<small className="text-muted">{moment(chirp._created).calendar()} {chirp._edited ? <>(Edited)</> : <></>}</small>
						</Card.Text>
						<Card.Text>
							<small><a href={editURL}>Edit</a> &#183; <a href="#" onClick={handleDelete}>Delete</a></small>
						</Card.Text>
					</Card.Body>
				</Card>
            </div>
        </div>
	);
};

interface DetailsProps {}

export default Details;