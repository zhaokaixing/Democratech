import ij.*;
import ij.plugin.*;
import ij.plugin.filter.*;
import ij.process.*;
import ij.gui.*;

/*
IsoPhotContour_ by Gabriel Landini G.Landini at bham. ac. uk
This plugin creates a number of contour level curves equally separated in the
greyscale space
20 Oct 2003 Released 1.0
30 Nov 2003 version 1.1, changed equality test for strings.
3 Feb 2007 version 1.2 supports stacks, added 'none'


*/
public class IsoPhotContour2_ implements PlugIn {

	public void run(String arg) {

		ImagePlus img = WindowManager.getCurrentImage();
		

		if (img==null){
			IJ.error("Error","No image!.\nPlease open an  8-bit image.");
			return;
		}

		if (img.getType()!=ImagePlus.GRAY8){
			IJ.error("Error","8 bit images only!");
			return;
		}
		IJ.run(img, "Find Edges", "");
		int x,y;
		int [] v =new  int[3];;
		int [] z =new  int[3];;
		ImageProcessor ip = img.getProcessor();
		int xe=ip.getWidth(), ye=ip.getHeight();
		boolean debutContour=false;
		boolean end=true;
		int [][] p = new  int[xe][ye];
		for (y=0;y<ye; y++) {
				for (x=0; x<xe; x++) {
					p[x][y]=ip.getPixel(x,y);
				}
		}
		
		for (y=1;y<ye-1;y++) {
				for (x=1;x<xe-1;x++) {
					//ip.getPixel(x,y,v);
					//ip.getPixel(x+1,y,z);
					if(p[x][y]>200)
					{
						
						if(debutContour==false)
						{
							IJ.log("Début v: "+p[x][y]+ "z: "+p[x+1][y]+ " x: "+x+" y: "+y);
							debutContour=true;
						}
						else if(debutContour==true && p[x+1][y] <200)
						{
							IJ.log("Fin v: "+p[x][y]+ "z: "+p[x+1][y]+ " x: "+x+" y: "+y);
							debutContour=false;
						}
						
					}
					if(debutContour==true)
					{
						ip.putPixel(x,y,250);
					}
					else{
						ip.putPixel(x,y,110);
					}
				}
		}
		
		

	}
}
