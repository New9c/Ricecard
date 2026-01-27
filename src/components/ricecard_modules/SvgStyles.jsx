export default function SvgStyles({ activeFont }) {
    return (
        <style>
            {`
				.hover-text {
        		  transform-box: fill-box;
        		  transform-origin: center;
				  transition: transform 0.3s ease !important;
        		}

        		.hover-text:hover {
        		  transform: translateY(-4px) !important;
        		}
				.exporting .intro-text {
				  animation: none !important;
				  opacity: 1 !important;
				  transform: translateY(0px) !important;
				}
				.intro-text {
				  opacity: 0;
				  transform: translateY(10px);
				  transform-box: fill-box;
				
				  animation: text-intro 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
				}
				
				@keyframes text-intro {
				  to { 
				    opacity: 1; 
				    transform: translateY(0px); 
				  }
				}
    		`}
            {activeFont && (
                <style>
                    {`@font-face {
        					  font-family: "${activeFont.name}";
        					  src: url("${activeFont.base64}") format("woff2");
        					}`}
                </style>
            )}
        </style>
    )
}
