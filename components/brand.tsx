import { ScanLine } from "lucide-react";
import Link from "next/link";
export function Brand({compact=false}:{compact?:boolean}){return <Link className="brand" href="/"><span className="brandmark"><ScanLine size={18}/></span>{!compact&&<span>Model<span>Sentinel</span></span>}</Link>}
