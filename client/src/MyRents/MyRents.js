import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './MyRents.css'
import { toast } from 'react-toastify';
class myRents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cars: [],
            redirect: false
        };
        this.removeCar = this.removeCar.bind(this);
    }

    componentDidMount() {
        fetch(`http://localhost:9999/feed/cars/myrents`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    cars: data.cars,
                })
            })
            .catch(console.log);
    }
    removeCar(event) {
        event.preventDefault();
        const carId = event.target.id;

        fetch(`http://localhost:9999/feed/car/unrent/${carId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user.token
            },
        })
        .then((response) => response.json())
        .then((data) => {
          toast.success(data.message);
  
          this.setState({
            redirect: true,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />;
        }
        return (
            <Fragment>
                <h1>My rented cars</h1>
                <div className="listings">
                    {
                        this.state.cars.map((car) => (
                            <div key={car._id} className="listing">
                                <h2>{car.brand}</h2>
                                <img src={car.imageUrl} alt="" />
                                <h3>Description: {car.description}</h3>
                                <p>Price per day: {car.pricePerDay} Pounds</p>
                                <Link name="rent" to='#' id={car._id} className="button" onClick={this.removeCar}>Remove</Link> :
                            </div>
                        ))
                    }
                </div>
            </Fragment>


        );
    }
}


export default myRents;
