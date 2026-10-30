import { ThreeDots } from 'react-loader-spinner'
import css from "./Loader.module.css"

interface LoaderProps {
  variant?: 'global' | 'fetching'; 
}

export default function Loader ({ variant = 'global'}: LoaderProps) {
  const isFetching = variant === 'fetching';

  const size = isFetching ? "40" : "45";
  
  return(
    <div className={`${css.loader} ${css[variant]}`}>
      <ThreeDots
        visible={true}
        height={size}
        width={size}
        color="#0d6efd"
        radius="9"
        ariaLabel="loading"
      />
    </div>
    )
}  