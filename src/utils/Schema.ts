import { Thing, WithContext } from 'schema-dts';

export function Schema<T extends Thing>(json: WithContext<T>) {
  return `${JSON.stringify(json)}`
}
