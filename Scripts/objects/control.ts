module objects {
	export class Control {
		rotationSpeed: number;
		opacity: number;
		color: number; // hexadecimal value of the color
		constructor(rotationSpeed: number, opacity: number, color:number) {
			this.rotationSpeed = rotationSpeed;
			this.opacity = opacity;
			this.color = color;
		}
	}
}