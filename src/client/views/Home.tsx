import * as React from 'react';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { IChirpDataArray } from '../../types';

const Home = (props: HomeProps) => {
	const history = useHistory();
    const [chirps, setChirps] = useState([]);

    const printChirps = chirps.map(val => {
        return (
            <Card key={val.id} role="button" className="rounded-3 mb-3" onClick={() => history.push('/details/' + val.id)}>
                <Card.Body>
                    <Card.Title>@{val.name.toLowerCase()}</Card.Title>
                    <Card.Text>
                        {val.content}
                    </Card.Text>
                    <Card.Text>
                        <small className="text-muted">{moment(val._created).calendar()} {val._edited ? <>(Edited)</> : <></>}</small>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }).reverse();

	useEffect(() => {
		async function getChirps() {
			try {
				const res = await fetch('/api/chirps');
				const chirpsData = await res.json();
				setChirps(chirpsData);
			} catch (error) {
				console.log(error);
			}
		}
		getChirps();
	}, []);

	return (
		<div className="row justify-content-center">
            <div className="col-sm-4">
                {printChirps}
            </div>
        </div>
	);
};

interface HomeProps {}

export default Home;