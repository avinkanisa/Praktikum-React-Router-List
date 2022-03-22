import React, { Component } from "react";
import $ from "jquery";
import List from "../Components/list";
class Agenda extends Component {
    constructor() {
        super()
        this.state = {
            event: [
                {
                    nama: "Pekan Lingkungan Hidup Indonesia-Jepang",
                    tanggal: "17 Agustus 2022",
                    lokasi: "Jalan Neo City",
                },
                {
                    nama: "Tanam Tanam Ubi",
                    tanggal: "16 September 2022",
                    lokasi: "Kebun Pak Slamet",
                },
                {
                    nama: "one tree for free",
                    tanggal: "25 Desember 2022",
                    lokasi: "Gunung Cilik",
                },
            ],

            action: "",
            nama: "",
            tanggal: "",
            lokasi: "",
            selectedItem: null,
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.event.map((item, index) => (
                        <List
                            nama={item.nama}
                            tanggal={item.tanggal}
                            lokasi={item.lokasi}
                            onEdit={() => this.Edit(item)}
                            onDrop={() => this.Drop(item)}
                        />
                    ))}
                </div>
                <br></br>
                <button className="btn btn-success" onClick={() => this.Add()}>
                    Tambah Data
                </button>
                <div className="modal" id="modal_event">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                Form Event
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Nama Event :
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.nama}
                                        onChange={ev => this.setState({
                                            nama:
                                                ev.target.value
                                        })}
                                        required />

                                    Tanggal :
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.tanggal}
                                        onChange={ev => this.setState({
                                            tanggal
                                                : ev.target.value
                                        })}
                                        required />

                                    Lokasi :
                                    <input type="text" className="form-control b-2"
                                        value={this.state.lokasi}
                                        onChange={ev => this.setState({ lokasi: ev.target.value })}
                                        required />
                                    <button className="btn btn-info btn-block" type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    Add = () => {
        $("#modal_event").show();
        this.setState({
            nama: "",
            tanggal: "",
            lokasi: "",
            action: "insert"
        })
    }
    Edit = (item) => {
        $("#modal_event").show();
        this.setState({
            nama: item.nama,
            tanggal: item.tanggal,
            lokasi: item.lokasi,
            action: "update",
            selectedItem: item
        })
    }
    Save = (event) => {
        event.preventDefault();
        let tempEvent = this.state.event
        if (this.state.action === "insert") {
            tempEvent.push({
                nama: this.state.nama,
                tanggal: this.state.tanggal,
                lokasi: this.state.lokasi,
            })
        } else if (this.state.action === "update") {
            let index = tempEvent.indexOf(this.state.selectedItem)
            tempEvent[index].nama = this.state.nama
            tempEvent[index].tanggal = this.state.tanggal
            tempEvent[index].lokasi = this.state.lokasi
        }
        this.setState({ event: tempEvent })
        $("#modal_event").hide();
    }

    Drop = (item) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            let tempEvent = this.state.event
            let index = tempEvent.indexOf(item)
            tempEvent.splice(index, 1)
            this.setState({ event: tempEvent })
        }
    }

}
export default Agenda;