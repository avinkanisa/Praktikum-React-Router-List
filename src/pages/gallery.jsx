import React, { Component } from "react";
import $ from "jquery";
import Card from "../Components/card";
class Gallery extends Component {
    constructor() {
        super()
        this.state = {
            buku: [
                {
                    isbn: "12345", judul: "Bulan", penulis: "Tere Liye",
                    penerbit: "CV Harapan Kita", harga: 90000,
                    cover: "https://cf.shopee.co.id/file/6ca8319acfea5ffd65dd4b1886e4dcdb"
                },

                {
                    isbn: "12346", judul: "Anak Badai", penulis: "Tere Liye",
                    penerbit: "CV Nusa Bangsa", harga: 80000,
                    cover: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//93/MTA-4283705/republika_si_anak_badai_full02.jpg "
                },
                {
                    isbn: "54321", judul: "Bumi", penulis: "Tere Liye",
                    penerbit: "CV Nusa Bangsa", harga: 70000,

                    cover: "https://www.bukuoriginal.com/wp-content/uploads/2019/11/jual-novel-bumi-tere-liye.jpg"

                },
            ],
            action: "",
            isbn: "",
            judul: "",
            penulis: "",
            penerbit: "",
            harga: 0,
            cover: "",
            selectedItem: null,
        }
        this.state.filterBuku = this.state.buku
    }
    render() {
        return (
            <div className="container">
                <input type="text" className="form-control my-2" placeholder="Pencarian"
                    value={this.state.keyword}
                    onChange={ev => this.setState({ keyword: ev.target.value })}
                    onKeyUp={ev => this.searching(ev)}
                />
                <div className="row">
                    {this.state.filterBuku.map((item, index) => (
                        <Card

                            judul={item.judul}
                            penulis={item.penulis}
                            penerbit={item.penerbit}
                            harga={item.harga}
                            cover={item.cover}
                            onEdit={() => this.Edit(item)}
                            onDrop={() => this.Drop(item)}
                            onCart={() => this.addToCart(item)}
                        />
                    ))}
                </div>
                <br></br>
                <button className="btn btn-success" onClick={() => this.Add()}>
                    Tambah Data
                </button>
                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal_buku">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-header">
                                Form Buku
                            </div>
                            {/* modal body */}
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Judul Buku

                                    <input type="text" className="form-control mb-2"

                                        value={this.state.judul}
                                        onChange={ev => this.setState({
                                            judul:
                                                ev.target.value
                                        })}
                                        required />
                                    Penulis Buku

                                    <input type="text" className="form-control mb-2"

                                        value={this.state.penulis}
                                        onChange={ev => this.setState({
                                            penulis
                                                : ev.target.value
                                        })}
                                        required />
                                    Penerbit Buku
                                    <input type="text" className="form-control mb-2"

                                        value={this.state.penerbit}
                                        onChange={ev => this.setState({
                                            penerbit: ev.target.value
                                        })}
                                        required />
                                    Harga Buku

                                    <input type="number" className="form-control mb-2"

                                        value={this.state.harga}
                                        onChange={ev => this.setState({
                                            harga:
                                                ev.target.value
                                        })}
                                        required />
                                    Cover Buku

                                    <input type="url" className="form-control mb-2"

                                        value={this.state.cover}
                                        onChange={ev => this.setState({
                                            cover:
                                                ev.target.value
                                        })}
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
        // menampilkan komponen modal
        $("#modal_buku").show()
        this.setState({
            isbn: Math.random(1, 10000000),
            judul: "",
            penulis: "",
            penerbit: "",
            cover: "",
            harga: 0,
            action: "insert"
        })
    }
    addToCart = (selectedItem) => {
        console.log("add to cart")
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))//untuk mendapatkan data yang lama    
        }
        let existItem = tempCart.find(item => item.isbn === selectedItem.isbn)
        console.log(existItem)
        if (existItem) {
            window.alert("Anda telah menambahkan produk ini")
        } else {
            let jumlah = window.prompt("Masukkan jumlah", "")
            if (jumlah === null || jumlah !== "") {
                selectedItem.jumlahBeli = jumlah


                tempCart.push(selectedItem)
                localStorage.setItem("cart", JSON.stringify(tempCart))

            }
        }
    }
    Edit = (item) => {
        // menampilkan komponen modal
        $("#modal_buku").show()
        this.setState({
            isbn: item.isbn,
            judul: item.judul,
            penulis: item.penulis,
            penerbit: item.penerbit,
            cover: item.cover,
            harga: item.harga,
            action: "update",
            selectedItem: item
        })
    }
    Save = (event) => {
        event.preventDefault();
        // menampung data state buku
        let tempBuku = this.state.buku
        if (this.state.action === "insert") {
            // menambah data baru
            tempBuku.push({
                isbn: this.state.isbn,
                judul: this.state.judul,
                penulis: this.state.penulis,
                penerbit: this.state.penerbit,
                cover: this.state.cover,
                harga: this.state.harga,
            })
        } else if (this.state.action === "update") {
            // menyimpan perubahan data
            let index = tempBuku.indexOf(this.state.selectedItem)
            tempBuku[index].isbn = this.state.isbn
            tempBuku[index].judul = this.state.judul
            tempBuku[index].penulis = this.state.penulis
            tempBuku[index].penerbit = this.state.penerbit
            tempBuku[index].cover = this.state.cover
            tempBuku[index].harga = this.state.harga
        }
        this.setState({ buku: tempBuku })
        // menutup komponen modal_buku
        $("#modal_buku").hide()
    }
    Drop = (item) => {
        // beri konfirmasi untuk menghapus data
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            // menghapus data
            let tempBuku = this.state.buku
            // posisi index data yg akan dihapus
            let index = tempBuku.indexOf(item)
            // hapus data
            tempBuku.splice(index, 1)
            this.setState({ buku: tempBuku })
        }

    }
    searching = event => {
        if (event.keyCode === 13) {
            let keyword = this.state.keyword.toLowerCase()
            let tempBuku = this.state.buku
            let result = tempBuku.filter(item => {
                return item.judul.toLowerCase().includes(keyword) ||
                    item.penulis.toLowerCase().includes(keyword) ||
                    item.penerbit.toLowerCase().includes(keyword)
            })
            this.setState({ filterBuku: result })
        }
    }
}
export default Gallery;
