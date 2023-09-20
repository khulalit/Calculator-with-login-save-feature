import { getServerSession } from 'next-auth/next'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { headers } from 'next/headers'
import DeleteButtons from './DeleteButtons';

type Calculation = {
  id: String,
  name : String,
  expression: String,
  result: String,
  userId: String,
}

async function getCalculations() {
  try {
    const res = await fetch(process.env.BASE_URL+'/api/calculation', {
      headers : headers()
    });
    const data = await res.json();
    return data.calculations;
    
  } catch (error) {
    return false;
  }
}



export default async function List() {

  const session = await getServerSession(options);

  if(!session?.user) return "Login to view saved calculations"; 

  const data: Calculation[] = await getCalculations();

  if(!data) return 'Failed to fetch';

  return (
    <table className="min-w-full font-[14px] bg-white border rounded-lg overflow-hidden">
        <thead className="border-y-2 border-gray-200 font-extrabold">
          <tr>
            <th className="px-3 py-1 text-left">
              <input type="checkbox" />
            </th>
            <th className="px-3 py-1 text-left">Name</th>
            <th className="px-3 py-1 text-left">Calculation</th>
            <th className="px-3 py-1 text-left">Results</th>
            <th className="px-3 py-1 text-left"></th>
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-gray-200 font-[500]">
          { data.map((row:any) => (
            <tr key={row.id}>
              <td className="px-3 py-1 whitespace-nowrap">
                <input
                  type="checkbox"
                />
              </td>
              <td className="px-3 py-1 whitespace-nowrap">{row.name}</td>
              <td className="px-3 py-1 flex flex-wrap">{row.expression}</td>
              <td className="px-3 py-1 whitespace-nowrap">{row.result}</td>
              <td className="px-3 py-1 whitespace-nowrap flex items-center gap-2">
                <DeleteButtons id={row.id} expression={row.expression} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}

