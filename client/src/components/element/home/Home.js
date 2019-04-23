import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Form, Button, Table} from 'react-bootstrap'
import 'react-table/react-table.css'
import Modalview from '../modal/ModalView';
import ReactLoading from 'react-loading';



const Home = () => {
    const [state, setState] = useState({
        url: '',
        isLoading: false,
        modalIsOpen: false,
        rowinfo: [],
        countries: [],
        sales:[],
        ratings: [],
        data: {},
        error: false
    })
    //
    // useEffect(() => {
    //     productDetails()
    // }, [])

    const productDetails = async () => {
        setState({...state, isLoading: true})

          await axios.post('/api/productDetails', {url: state.url})
               .then(function (response) {
                   if (response.data === ""){
                       throw new  Error()
                   }
                    setState({...state, data: response.data, modalIsOpen: true, isLoading: false})

               })
               .catch(function (error) {
                   console.log("ERRORORORO",error);
                   setState({...state, error: true})

               });


    }
    const ErrorBanner = props => {
        if (!props.error) {
            return null;
        }

        return (
            <div className="alert alert-warning" role="alert" style={{marginTop: "100px"}}>
                Oops.... Something went wrong getting your data please try using another Url.
            </div>
        );
    }


    const closeModal = e => {
        setState({...state, modalIsOpen: false});
    }



    return (

        <div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Please insert product Url</Form.Label>
                    <Form.Control value={state.url} onChange={e => setState({...state, url: e.target.value})} type="text"
                                  placeholder="" />
                </Form.Group>
                <ErrorBanner error={state.error}/>

                <Button onClick={() => productDetails()} variant="primary" type="button" disabled={state.isLoading }>
                    Submit
                </Button>
            </Form>
            <div>
                {state.modalIsOpen ? (<Modalview
                    data={state.data}
                    modalIsOpen={true}
                    closeModal={closeModal}
                />) : ""}
            </div>
            <div>
                {state.isLoading ? ( <ReactLoading type={"balls"} color={"grey"} height={'10%'} width={'10%'}/>) : ""}
            </div>
        </div>

    )
}

export default Home;