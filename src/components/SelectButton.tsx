
export default function SelectButton({children, ...props} : any) {
  return (
    <select {...props}>{children}</select>
  )
}
