// Valores permitidos para formas e cores usados em todas as figuras.
type Shape = 'triangle' | 'circle' | 'rectangle';
type Color = 'red' | 'green' | 'blue';

// Contrato comum para todos os tipos de figuras.
export interface Figure {
  shape: Shape;
  color: Color;
  getArea(): number;
}

// Trunca para 2 casas decimais (sem arredondar para cima).
const roundDownToHundredths = (value: number): number =>
  Math.floor(value * 100) / 100;

// Validação compartilhada para comprimentos positivos.
const ensurePositive = (value: number, label: string): void => {
  if (value <= 0) {
    throw new Error(`${label} must be a positive number`);
  }
};

export class Triangle implements Figure {
  // Propriedades da interface pública.
  public shape: Shape = 'triangle';

  public color: Color;

  // Comprimentos dos lados internos.
  private a: number;

  private b: number;

  private c: number;

  constructor(color: Color, a: number, b: number, c: number) {
    // Valida os lados e a desigualdade triangular.
    ensurePositive(a, 'Side a');
    ensurePositive(b, 'Side b');
    ensurePositive(c, 'Side c');

    const longestSide = Math.max(a, b, c);
    const perimeter = a + b + c;

    if (longestSide >= perimeter - longestSide) {
      throw new Error(`sides ${a}, ${b} and ${c} can't form a triangle`);
    }

    this.color = color;
    this.a = a;
    this.b = b;
    this.c = c;
  }

  public getArea(): number {
    // Fórmula de Heron.
    const semiPerimeter = (this.a + this.b + this.c) / 2;
    const area = Math.sqrt(
      semiPerimeter *
        (semiPerimeter - this.a) *
        (semiPerimeter - this.b) *
        (semiPerimeter - this.c),
    );

    return roundDownToHundredths(area);
  }
}

export class Circle implements Figure {
  // Propriedades da interface pública.
  public shape: Shape = 'circle';

  public color: Color;

  // Raio interno.
  private radius: number;

  constructor(color: Color, radius: number) {
    // Valida o raio.
    ensurePositive(radius, 'Radius');
    this.color = color;
    this.radius = radius;
  }

  public getArea(): number {
    // Área do círculo: πr².
    const area = Math.PI * this.radius * this.radius;

    return roundDownToHundredths(area);
  }
}

export class Rectangle implements Figure {
  // Propriedades da interface pública.
  public shape: Shape = 'rectangle';

  public color: Color;

  // Dimensões internas.
  private width: number;

  private height: number;

  constructor(color: Color, width: number, height: number) {
    // Valida as dimensões.
    ensurePositive(width, 'Width');
    ensurePositive(height, 'Height');
    this.color = color;
    this.width = width;
    this.height = height;
  }

  public getArea(): number {
    // Área do retângulo: largura × altura.
    const area = this.width * this.height;

    return roundDownToHundredths(area);
  }
}

// Retorna um resumo legível para qualquer figura.
export function getInfo(figure: Figure): string {
  return `A ${figure.color} ${figure.shape} - ${figure.getArea()}`;
}
