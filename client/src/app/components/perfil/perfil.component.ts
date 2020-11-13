import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario-modelo';
import { AuthService } from 'src/app/services/auth.service';
import { Aprobados } from 'src/app/models/aprobados';
import { MinLengthValidator } from '@angular/forms';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  MiUsuario: Usuario[];
  MiDato:Aprobados[];
  Meat: number=Number(localStorage.getItem('Usuario'));

  constructor(private _servicio: AuthService,
      private enrutador:Router) { }


  ngOnInit(): void {
    this._servicio.obtenerPerfil(this.Meat).subscribe(res=>{this.MiUsuario=res
    console.log(this.MiUsuario)
    })
    this._servicio.obtenerCursosAprobados(this.Meat).subscribe(function(res){
     
     var total = 0
      console.log(res)
      this.MiDato=res
      var tabla = document.createElement("table")
      var thead = document.createElement("thead")
      var tbody = document.createElement("tbody")
      document.body.appendChild(tabla)
      tabla.appendChild(thead)
      tabla.appendChild(tbody)
      tabla.className = "table table-striped table-dark"
      var tr = document.createElement("tr")
      var th = document.createElement("th")
      var th2 = document.createElement("th")
      var th3 = document.createElement("th")
      var th4 = document.createElement("th")
      var td = document.createElement("td")
    
      thead.appendChild(tr)
        tr.appendChild(th)
        tr.appendChild(th2)
        tr.appendChild(th3)
        tr.appendChild(th4)
        th.appendChild(document.createTextNode("CARNET"))
        th2.appendChild(document.createTextNode("CURSO"))
        th3.appendChild(document.createTextNode("NOTA"))
        th4.appendChild(document.createTextNode("CREDITOS"))
        var sumacreditos = document.querySelector("#creditos")
        for (let index = 0; index < this.MiDato.recordset.length; index++) {
          var trbody = document.createElement("tr")
          var thbody = document.createElement("th")
          var thedad = document.createElement("th")
          var thactivo = document.createElement("th")
          var thpromedio = document.createElement("th")
          var nombreCuerpo = document.createTextNode(this.MiDato.recordset[index].Carne)
          var nombreCuerpoedad = document.createTextNode(this.MiDato.recordset[index].Nombre)
          var nombreCuerpactivo = document.createTextNode(this.MiDato.recordset[index].NotaAprobada)
          var nombreCuerpapromedio = document.createTextNode(this.MiDato.recordset[index].Creditos)
          tbody.appendChild(trbody)
          trbody.appendChild(thbody)
          trbody.appendChild(thedad)
          trbody.appendChild(thactivo)
          trbody.appendChild(thpromedio)
          thbody.appendChild(nombreCuerpo)
          thedad.appendChild(nombreCuerpoedad)
          thactivo.appendChild(nombreCuerpactivo)
          thpromedio.appendChild(nombreCuerpapromedio)
          total += this.MiDato.recordset[index].Creditos;
            
        }
        sumacreditos.innerHTML = "CREDITOS TOTALES: "+ total
    })
    
  }

  Modificar(): void {
    var nombre:string=(<HTMLInputElement>document.getElementById("nombre")).value
    var apellido:string=(<HTMLInputElement>document.getElementById("apellido")).value
    var correo:string=(<HTMLInputElement>document.getElementById("correo")).value

    this._servicio.modificarPerfil(this.Meat, nombre,apellido,correo).subscribe(respu =>{
      console.log(respu)
      if(respu=='LISTO!'){
        window.location.reload()
      }
    })
  }
  
}
