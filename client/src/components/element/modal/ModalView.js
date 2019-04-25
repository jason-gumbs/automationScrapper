import React from 'react';
import Modal from 'react-modal';
import {Table} from 'react-bootstrap'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "75%"
    }
};

Modal.setAppElement('#root')

let sortedCountry  = []

const ModalView = (props) => {

    const groupBy = array => {
        var sortable = [];
        var object = array.reduce((a, b) =>
            ({
                ...a,
                [b]: (a[b] || 0) + 1
            }), {})

        for (var x in object) {
            sortable.push([x, object[x]])
            sortable.sort((a, b) => a[1] - b[1])
            sortable.reverse()
        }
        return sortable
    }

    sortedCountry = groupBy(props.data.country)
    let  totalSales = props.data.sales.reduce(function(a, b) { return a + b; }, 0);


    const results = sortedCountry.map((k, i) => {
        console.log(k);

        return <tr key={i}>
            <td>{i}</td>
            <td>{k[0]} </td>
            <td>{k[1]}</td>
        </tr>
    })
    return (
        <Modal
            isOpen={props.modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={props.closeModal}
            style={customStyles}
            contentLabel="Query Detail"
        >
            <h2>Product Detail <button type="button" className="close"
                                     aria-label="Close"
                                     onClick={props.closeModal}>
                <span aria-hidden="true">&times;</span>
            </button></h2>
            <hr/>

            <div className="row">
                <h2 className="col">Todays top countries</h2>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Country</th>
                        <th>Amount purchase</th>
                    </tr>
                    </thead>
                    <tbody>
                    {results || "N/A"}
                    </tbody>
                </Table>
            </div>
            <hr/>
            <dl className="row">
                <dt className="col">Todays Sales</dt>
                <dd className="col">{totalSales|| "N/A"}</dd>
                <dt className="col">Rating</dt>
                <dd className="col">{props.data.rating || "N/A"}</dd>
                <dt className="col">Total orders</dt>
                <dd className="col">{props.data.totalOrders || "N/A"}</dd>
            </dl>

        </Modal>)
}

export default ModalView;

