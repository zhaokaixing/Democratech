import ij.*;
import ij.plugin.*;
import ij.process.*;
import ij.plugin.filter.*;
import ij.gui.*;

/*
IsoPhotContour_ by Gabriel Landini G.Landini at bham. ac. uk
This plugin creates a number of contour level curves equally separated in the
greyscale space
20 Oct 2003 Released 1.0
30 Nov 2003 version 1.1, changed equality test for strings.
3 Feb 2007 version 1.2 supports stacks, added 'none'


*/
public class DetectionDeContour implements PlugInFilter {
	private int [][] pix;
	private boolean [][] contour;
	private int seuil;
	public void run(ImageProcessor ipm) {

		ImagePlus img = WindowManager.getCurrentImage();
		if (img==null){
			IJ.error("Erreur","Veuillez ouvrir une image");
			return;
		}

		if (img.getType()!=ImagePlus.GRAY8){
			IJ.error("Erreur","Seules les images de 8 bits en nuance de gris");
			return;
		}

		ImageProcessor ip = img.getProcessor();

		int x, y;
		int xe=ip.getWidth(), ye=ip.getHeight();
		seuil = 50;
		pix = new  int[xe][ye];
		contour= new boolean[xe][ye];

		//Recupere l'image
		for (y=0;y<ye; y++) {
			for (x=0; x<xe; x++) {
				pix[x][y]=ip.getPixel(x,y);
			}
		}
		
		getContour(ip);
		colorierForme(ip);	
	}
	
	private void getContour(ImageProcessor ip)
	{
		int x, y;
		int xe=ip.getWidth(), ye=ip.getHeight();
		//Pour chaque pixel
		for (y=1;y<ye-1;y++) {
			for (x=1;x<xe-1;x++) {
				ip.putPixel(x,y,0);
				//Si un pixel du voisinage a une couleur suffisament différente du pixel actuel on considre cela comme un contour
					if(Math.abs(pix[x][y]- pix[x][y-1]) > seuil || Math.abs(pix[x][y]- pix[x][y+1]) > seuil
					|| Math.abs(pix[x][y]- pix[x-1][y]) > seuil|| Math.abs(pix[x][y]- pix[x+1][y]) > seuil
					|| Math.abs(pix[x][y]- pix[x+1][y-1]) > seuil || Math.abs(pix[x][y]- pix[x-1][y+1]) > seuil
					||Math.abs(pix[x][y]- pix[x+1][y+1]) > seuil ||Math.abs(pix[x][y]- pix[x-1][y-1]) > seuil){
						ip.putPixel(x,y,250);
						contour[x][y]=true;
					}
					else{
						contour[x][y]=false;
					}
					
			}
		}
	}
	
	private void colorierForme(ImageProcessor ip)
	{
		int x, y;
		int xe=ip.getWidth(), ye=ip.getHeight();
		boolean debutContour=false;
		//Pour chaque pixel
		for (y=1;y<ye-1;y++) {
				for (x=1;x<xe-1;x++) {
					//Si c'est un contour
					if(contour[x][y]==true)
					{
						//Si le pixel d'après est un contour
						if(debutContour==true && contour[x+1][y]==false){
							debutContour=false;
						}
						//Si le pixel d'après est la zone dans le contour
						else if(debutContour==false &&contour[x+1][y]==false){
							debutContour=true;
						}
					}
					//Mets l'intérieur du contour en blanc
					else if(debutContour==true)
					{
						ip.putPixel(x,y,250);
					}
					else{
						ip.putPixel(x,y,0);
					}
				}
				debutContour=false;
		}
	}
	public int setup(String arg, ImagePlus imp){
	if (arg.equals("about")){
		IJ.showMessage("Traitement de l'image");
		return DONE;
	}
	return DOES_8G;
	}
}
