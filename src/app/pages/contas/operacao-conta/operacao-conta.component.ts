import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SaqueDeposito } from "src/app/shared/models/SaqueDeposito";
import { Transferencia } from "src/app/shared/models/Transferencia";
import { ClienteService } from "src/app/shared/services/cliente.service";
import { ContaService } from "src/app/shared/services/conta.service";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-operacao-conta',
    templateUrl: './operacao-conta.component.html',
    styleUrls: ['./operacao-conta.component.scss']
  })
export class OperacaoContaComponent implements AfterViewInit {
  operacao;
  formGroupDeposito: FormGroup;
  formGroupTransferencia: FormGroup;
  contas: any;

  constructor(private contaService: ContaService, private clienteService: ClienteService, private router: Router, private route: ActivatedRoute){
    this.formGroupDeposito = new FormGroup({
      conta: new FormControl(this.route.snapshot.params["id"]),
      valor: new FormControl('', Validators.required)
    });
    this.formGroupTransferencia = new FormGroup({
      conta_origem: new FormControl(this.route.snapshot.params["id"]),
      conta_destino: new FormControl(null, Validators.required),
      valor: new FormControl('', Validators.required)
    });
    this.operacao = this.route.snapshot.params["type"]
  }

  ngOnInit(): void {
    this.contaService.listar().subscribe(contas => {
      this.contas = contas;
    })
  }

  ngAfterViewInit() {

  }

  operacoes() {
    if (this.operacao == "D")
    {
      const deposito: SaqueDeposito = this.formGroupDeposito.value;
      // Modo de criação
      this.contaService.deposito(deposito).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Depósito registrado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/conta']);
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao registrar depósito!',
          });
        }
      });
    }
    else 
    {
      const tranferencia: Transferencia = this.formGroupTransferencia.value;
      this.contaService.tranferencia(tranferencia).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Transferência registrada com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/conta']);
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao registrar transferência!',
          });
        }
      });
    }
  }

}