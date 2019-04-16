package com.codebind;

import javax.print.attribute.IntegerSyntax;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.function.Function;

public class Customer {
        private int TIME=0;
        private int LastClientTime = 0;
        private int LastRandomTime = 0;
        private int CustomerNum = 0;
        private int Tmax;
        private int Tmin;
        private int minRandom;
        private int maxRandom;
        private int STATUS=0;
        private int Nka;
        private int Tka;
        private boolean CFlag = false;
        private boolean ClietnHasArrived = false;
//        private int[] customerAr = {-1,-1,-1,-1,-1};
        private List<Integer> customerAr = new ArrayList<>();
        Random random = new Random();

        public void ReadFromFile(){
            int i=0;
            try{
                FileInputStream fstream = new FileInputStream("/home/amishi/BestL/text1.txt");
                BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
                String strLine;
                customerAr.clear();
                while ((strLine = br.readLine()) != null){
                    //TODO Implement with ArrayList
//                    customerAr[i] = Integer.parseInt(strLine);
                    if (!strLine.equals("")) {
                        customerAr.add(Integer.parseInt(strLine));
                        i++;
                        System.out.println(strLine);
                    }
                }
            }catch (IOException e){
                System.out.println("Ошибка");
                e.printStackTrace();
            }
        }


    public void setTmax (int x){
            Tmax = x;
    }

    public void setTmin (int x){
            Tmin = x;
    }

    public void chooseTRandom(){
            if((Tmax != 0 )&&(Tmin != 0)){
                if (Tmax ==Tmin){
                    LastRandomTime = Tmin;
                }
                minRandom = Tmin;
                maxRandom = Tmax;
                int diff = maxRandom - minRandom;
                LastRandomTime = random.nextInt(diff + 1);
                LastRandomTime += minRandom;
            }

    }

    public void CustomerOnChair(){
            ClietnHasArrived = false;
            System.out.println("STATUS " + STATUS);
            if (STATUS ==1){
                ReadFromFile();
                if (LastRandomTime == 0){
                    chooseTRandom();
                }
                System.out.println("LRT"+LastRandomTime);
                System.out.println("LCT"+ LastClientTime);
                if ( (TIME == LastRandomTime + LastClientTime) && (LastRandomTime != 0) ){
//                    for (int i = 0; i<customerAr.length; i++){
//
//                        if (customerAr[i]>0){
//                            localCountCustomer++;
//                        }
//
//                    }
                    System.out.println("Size"+customerAr.size());
                    if  (customerAr.size() < 5) { //короче эта хрень равна 0, а в массив записывается
                        CustomerNum++;
                        ClietnHasArrived = true;
                        LastClientTime = TIME;

                        customerAr.add(CustomerNum);

                        try(FileWriter writer = new FileWriter("/home/amishi/BestL/text1.txt", true))
                        {
                            // запись всей строки
                            String text = String.valueOf(CustomerNum);
                            writer.write(text);
                            writer.write('\n');
                            writer.flush();
                        }
                        catch(IOException ex){

                            System.out.println(ex.getMessage());
                        }
                        Nka = CustomerNum;

                        Tka = TIME; //vernut v tabl pryamo otsuda

                        chooseTRandom();
                    } else LastClientTime = TIME;
                }
                TIME++;
                System.out.print("TOME^ "+TIME+ "");
            }

    }

    public int getNka(){
            return Nka;
    }
    public int getTka(){

            return Tka;
    }

    public boolean isClietnHasArrived() {
        return ClietnHasArrived;
    }

    public void setClietnHasArrived(boolean clietnHasArrived) {
        ClietnHasArrived = clietnHasArrived;
    }

    public void setStatus(int z){
            STATUS = z;
    }

    public int getStatus(){
            return STATUS;
    }
    public int getLastRandomTime(){
            return LastRandomTime;
    }

    public List<Integer> getClientsArray(){
            return customerAr;
    }


}
