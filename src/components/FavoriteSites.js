import React, { Component } from 'react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_FAVORITE_SITES = gql`
  query favoriteSites($email: String!) {
    myFavoriteSites(email: $email) {
		id
		name
		latitude
		longitude
		sensors {
			id
			unit
			unitDescription
			measurements {
				dateMeasured
				measuredValue
			}
		}
	}
  }
`;

export default class FavoriteSites extends Component {
	constructor(props) {
		super(props);
	}

	render = () => {
		let variables = { email: this.props.email }
		return (
			<Query query={GET_FAVORITE_SITES} variables={variables}>
				{({ data, loading, error }) => {
				if (loading || !(data)) return <p className="loading">loading...</p>;
				if (error) return <p>ERROR</p>;
		
				return (
					<ul className="favoriteSitesList">
						{data.myFavoriteSites.map(site => {
							let mapsUrl = "http://www.google.com/maps/place/";

							mapsUrl+=site.latitude;
							mapsUrl+=","
							mapsUrl+=site.longitude;

							return (
								<li key={site.id}>
									<p><a href={mapsUrl}><b>{site.id} - {site.name}</b></a></p>
									<ul>
										{site.sensors.map(siteSensor => {
											let unit = siteSensor.unit;
											return(
												<li key={siteSensor.id}><p><b>Sensor - {siteSensor.id}</b><br/><i>{siteSensor.unitDescription}</i></p>
													<ul>
														{siteSensor.measurements.map(flow=>{
															return(<li><p>{flow.measuredValue} {unit} - <i>{flow.dateMeasured}</i></p></li>)
														})}
													</ul>
												</li>
											)
										})}
									</ul>
								</li>
							)
						})}
					</ul>
				);
			}}
			</Query>
		);
	}
}