import { container } from "tsyringe";

export default <TInstance>(token: string): TInstance => container.resolve(token);