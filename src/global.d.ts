/// <reference types="vite/client" />

declare module '*.module.css' {
  const mapping: Mapping
  export default mapping
}

declare module '*.svg' {
  const content: string
  export default content
}
