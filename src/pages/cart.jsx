import React from "react";
import $ from "jquery";
export default class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      cart: [],//local
      user: "",//session
      action: "",
      total: 0//dapat dari hasil perhitungan
    }
  }
  getUser = () => {
    let userName = sessionStorage.getItem("user")
    this.setState({
      user: userName
    })
  }
  getCart = () => {
    let tempCart = []
    let totalHarga = 0
    if (localStorage.getItem("cart") !== null) {
      tempCart = JSON.parse(localStorage.getItem("cart"))
    }
    tempCart.map(item => {
      //2 cara
      //totalHarga = totalHarga + (item.harga * item.jumlahBeli)
      totalHarga += (item.harga * item.jumlahBeli)
    })
    this.setState({
      cart: tempCart,
      total: totalHarga
    })
  }
  removeCart = () => {

    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {

      let tempCart = []
      localStorage.removeItem("cart");
      this.setState({
        cart: tempCart,
        total: 0
      });
    }
  }

  drop = (item) => {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      let tempCart = this.state.cart
      let updateHarga = 0
      let total = this.state.total
      let index = tempCart.indexOf(item)

      updateHarga = total - (item.harga * item.jumlahBeli)

      tempCart.splice(index, 1)

      this.setState({
        cart: tempCart,
        total: updateHarga

      })
      localStorage.setItem("cart", JSON.stringify(tempCart))

    }
  };

  Edit = (item) => {
    // menampilkan komponen modal
    $("#modal_cart").show()
    this.setState({
      isbn: item.isbn,
      judul: item.judul,
      harga: item.harga,
      jumlahBeli: this.state.jumlahBeli,
      action: "update",
      selectedItem: item
    })
  }
  componentDidMount = () => {
    this.getUser()
    this.getCart()
    //dalam duatu halaman supaya tidak kosong nanti akan langsung muncul data user dan cart tanpa perlu melakukan suatu aksi
    //fungsi yang ada aksi atau pemicunya button (save,edit,drop,update) tidak perlu dimasukkan karena ada aksi yaitu si button
  }
  Save = (event) => {
    event.preventDefault();
    // menampung data state buku
    let tempCart = this.state.cart
    let updateHarga = 0
    let total = this.state.total
    updateHarga = total - (event.harga * event.jumlahBeli)

    if (this.state.action === "update") {
      // menyimpan perubahan data
      let index = tempCart.indexOf(this.state.selectedItem)
      tempCart[index].judul = this.state.judul
      tempCart[index].harga = this.state.harga
      tempCart[index].jumlahBeli = this.state.jumlahBeli


    }
    this.setState({
      cart: tempCart,
      total: updateHarga

    })
    localStorage.setItem("cart", JSON.stringify(tempCart))
    // menutup komponen modal_buku
    $("#modal_cart").hide()
  }
  editCart = (item) => {
    // event.preventDefault();
    $("#modal_cart").show()
    let tempCart = []

    if (localStorage.getItem("cart") !== null) {
      tempCart = JSON.parse(localStorage.getItem("cart"))//untuk mendapatkan data yang lama 

    }
    this.setState({
      isbn: item.isbn,
      judul: item.judul,
      harga: item.harga,
      jumlahBeli: this.state.jumlahBeli,
      action: "update",
      selectedItem: item

    })


  }
  render() {
    return (
      <div className="container">
        <div className="card col-12 mt-2 ">
          <div className="card-header bg-primary text-white">
            Keranjang Belanja
          </div>
          <div className="card-body ">
            <h5 className="text-grey">
              Nama Pengguna : {this.state.user}</h5>
            <table className="table table-bordered">
              <thead>
                <th>Judul Buku</th>
                <th>Harga</th>
                <th>Jumlah</th>
                <th>Total Harga</th>
                <th>Hapus</th>
                <th>Edit</th>
              </thead>
              <tbody>
                {this.state.cart.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.judul}</td>
                      <td>{item.harga}</td>
                      <td>{item.jumlahBeli}</td>
                      <td>{item.harga * item.jumlahBeli}</td>
                      <td>
                        <button className="btn btn-sm btn-danger "
                          onClick={() => this.drop(item)}>
                          Hapus
                        </button></td>
                      <td>
                        <button className="btn btn-sm btn-info "
                          onClick={() => this.editCart(item)}>
                          Edit
                        </button></td>

                    </tr>

                  )
                })}

              </tbody>
              <h5 className="text-info">
                Total  Harga : {this.state.total}</h5>

            </table>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <button class="btn btn-info me-md-2" onClick={this.removeCart} type="button">Hapus Cart</button>
            </div>
          </div>
        </div>
        <div className="modal" id="modal_cart">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* modal header */}
              <div className="modal-header">
                Form Buku
              </div>
              {/* modal body */}
              <div className="modal-body">
                <form onSubmit={(ev) => this.Save(ev)}>
                  Judul Buku

                  <input type="text" className="form-control mb-2"

                    value={this.state.judul}
                    onChange={ev => this.setState({
                      judul:
                        ev.target.value
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

                  Jumlah Beli

                  <input type="number" className="form-control mb-2"

                    value={this.state.jumlahBeli}
                    onChange={ev => this.setState({
                      jumlahBeli:
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
}