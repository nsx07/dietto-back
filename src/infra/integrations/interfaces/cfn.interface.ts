export abstract class ICFNService {
  abstract getNationalConsultationNutritionists(
    options: NationaConsultationNutritionistsOptions,
  ): Promise<NationaConsultationNutritionists>;
}

export interface NationaConsultationNutritionistsOptions {
  nome: string;
  registro: string;
}

export interface NationaConsultationNutritionists {
  success: boolean;
  data: {
    nome: string;
    registro: string;
    crn: number;
    data_cadastro: `${number}-${number}-${number}`;
    situacao: 'ativo' | 'baixa' | 'cancelado' | string;
    tipo_registro: 'NUTRICIONISTA DEFINITIVO' | string;
  }[];
}
