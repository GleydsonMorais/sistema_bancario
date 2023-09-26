import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Conta } from "src/app/shared/models/Conta";
import { ContaService } from "src/app/shared/services/conta.service";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-listagem-conta',
    templateUrl: './listagem-conta.component.html',
    styleUrls: ['./listagem-conta.component.scss']
  })
export class ListagemContaComponent implements AfterViewInit {
    displayedColumns: string[] = ['id', 'numero', 'agencia', 'saldo', 'cliente', 'funcoes'];
    dataSource = new MatTableDataSource<Conta>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private contaService: ContaService){
    }
    
    ngAfterViewInit() {
        this.listarContas(1, 5)
    }

    listarContas(page: number, pageSize: number) {
      this.contaService.listar_paginado(page, pageSize).subscribe(contas => {
        this.dataSource.data = contas; 
      });
    }

    onPageChange(event: PageEvent) {
      const pageIndex = event.pageIndex + 1; 
      const pageSize = event.pageSize;
      this.listarContas(pageIndex, pageSize);
    }

    deletarConta(id: number){
      Swal.fire({
        title: 'Você tem certeza que deseja deletar?',
        text: "Não tem como reverter essa ação",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: 'grey',
        confirmButtonText: 'Deletar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.contaService.deletar(id).subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'Conta deletada com sucesso!',
                showConfirmButton: false,
                timer: 1500
              })
              this.listarContas(1,5)
            },
            error: (error) => {
              console.error(error)
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Erro ao deletar cliente!',
              })
            }})
        }})}
}