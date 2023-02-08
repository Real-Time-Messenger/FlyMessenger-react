/**
 * Interface for the Session model.
 */
export interface ISession {
	id: string;
	token: string;
	ipAddress: string;
	type: "DESKTOP" | "WEB";
	location: string;
	label: string;
	current?: boolean;
	createdAt: Date;
}
