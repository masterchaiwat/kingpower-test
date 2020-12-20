



export default function Test() {
   
   

    return (
      <div>
        {star(5)}
      </div>
    );
}

export function jump() {
   
  return (
    <div>
      <input type="text" name="jump"/>
    </div>
  );
}

export const star = (x) => 10*x;
