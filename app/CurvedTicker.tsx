const tickerItems = ['WEBSITES THAT WORK HARDER', 'PRODUCTS PEOPLE WANT TO USE', 'SYSTEMS THAT MAKE WORK SIMPLER'];

function TickerSet() {
 return <div className="curved-ticker-set" aria-hidden="true">
  {[...tickerItems, ...tickerItems].map((item,index)=><span className="curved-ticker-item" key={`${item}-${index}`}>{item}<i>✦</i></span>)}
 </div>;
}

export default function CurvedTicker(){
 return <section className="curved-ticker" aria-label="Websites that work harder. Products people want to use. Systems that make work simpler.">
  <span className="sr-only">Websites that work harder. Products people want to use. Systems that make work simpler.</span>
  <div className="curved-ticker-track"><TickerSet/><TickerSet/></div>
 </section>;
}
