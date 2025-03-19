import { Injectable, Scope } from '@nestjs/common';
import {
  ICFNService,
  NationaConsultationNutritionists,
  NationaConsultationNutritionistsOptions,
} from '../interfaces/cfn.interface';

@Injectable()
export class CFNService implements ICFNService {
  private _cfnEndpoint =
    'https://cnn.cfn.org.br/application/front-resource/get';

  async getNationalConsultationNutritionists(
    options: NationaConsultationNutritionistsOptions,
  ): Promise<NationaConsultationNutritionists> {
    const bodyCommand = {
      comando: 'get-nutricionista',
      options: {
        nome: options.nome,
        crn: options.registro,
        registro: null,
        geral: true,
      },
    };

    const response = await fetch(`${this._cfnEndpoint}`, {
      method: 'POST',
      body: JSON.stringify(bodyCommand),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  }
}
