// Декларация типов CSS (чтобы не ругался редактор кода)
declare module '*.css' {
    const styles: {[key: string]: string}
    export = styles
}