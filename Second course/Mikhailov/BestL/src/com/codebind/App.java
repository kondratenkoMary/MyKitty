package com.codebind;

import javax.swing.*;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableColumn;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import java.util.ArrayList;
import java.util.List;
import java.util.TimerTask;
import java.util.Timer;


public class App {
    private JTable table1;
    private JPanel panelMain;
    private static Customer globalCustomer = null;


    public static void main(String[] args) {
        JFrame frame = new JFrame("App");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLocationRelativeTo(null);

        // Setting layouts
        GridBagLayout mainLayout = new GridBagLayout();
        frame.setLayout(mainLayout);


        JPanel panel = (JPanel) frame.getContentPane();
        GridBagConstraints c = new GridBagConstraints();
        JLabel labelPic1 = new JLabel();
        ArrayList<JLabel> arrayOfPic = new ArrayList<JLabel>();
        c.anchor = GridBagConstraints.LINE_START;
        c.gridx = 0;
        c.gridy = 0;
//"/home/amishi/xG2n7GGEoPM.jpg"
        labelPic1.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
        panel.add(labelPic1);
        arrayOfPic.add(labelPic1);

        JLabel labelPic2 = new JLabel();
        c.anchor = GridBagConstraints.LINE_START;
        c.gridx = 1;
        c.gridy = 0;
        labelPic2.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
        panel.add(labelPic2);
        arrayOfPic.add(labelPic2);

        JLabel labelPic3 = new JLabel();
        c.anchor = GridBagConstraints.LINE_START;
        c.gridx = 2;
        c.gridy = 0;
        labelPic3.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
        panel.add(labelPic3);
        arrayOfPic.add(labelPic3);

        JLabel labelPic4 = new JLabel();
        c.anchor = GridBagConstraints.LINE_START;
        c.gridx = 3;
        c.gridy = 0;
        labelPic4.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
        panel.add(labelPic4);
        arrayOfPic.add(labelPic4);

        JLabel labelPic5 = new JLabel();
        c.anchor = GridBagConstraints.LINE_START;
        c.gridx = 4;
        c.gridy = 0;
        labelPic5.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
        panel.add(labelPic5);
        arrayOfPic.add(labelPic5);

        DefaultTableModel model = new DefaultTableModel();
        JTable peopleTable = new JTable(model);

        model.addColumn("");
        model.addRow(new Object[]{"Nka"});
        model.addRow(new Object[]{"Tka"});

//        for (int i=0; i<50; i++){
//            model.addColumn("");
//            model.setValueAt(i, 0, i+1); //znachenie vmesto i esli chto dura
//            model.setValueAt(i, 1, i+1);
//        }


        JScrollPane peopleTableScrolPage = new JScrollPane(peopleTable);
        peopleTable.setAutoResizeMode(JTable.AUTO_RESIZE_OFF);
        peopleTableScrolPage.setPreferredSize(new Dimension(300, 70));
        frame.add(peopleTableScrolPage, new GridBagConstraints(0, 1, 1, 1, 1, 1,
                GridBagConstraints.NORTHWEST, GridBagConstraints.NONE,
                new Insets(1, 1, 1, 1), 0, 0));
       //  peopleTable.setSize(200,50);


        JLabel label1 = new JLabel("TprMax");
        //GridBagConstraints c = new GridBagConstraints();
        c.anchor = GridBagConstraints.LINE_START;
        c.gridx = 0;
        c.gridy = 2;
        frame.add(label1, c);


        SpinnerModel sm = new SpinnerNumberModel(1, 1, 10000, 1); //default value,lower bound,upper bound,increment by
        JSpinner spinner1 = new JSpinner(sm);
        int vue1 = 2;
        c.anchor = GridBagConstraints.CENTER;
        c.gridx = 0;
        c.gridy = 2;
        spinner1.setValue(vue1);
        frame.add(spinner1, c);

        JLabel label2 = new JLabel("TprMin");
        c.anchor = GridBagConstraints.LINE_START;
        c.gridx = 0;
        c.gridy = 3;
        frame.add(label2, c);

        SpinnerModel sm2 = new SpinnerNumberModel(1, 1, 10000, 1);
        JSpinner spinner2 = new JSpinner(sm2);
        int vue2 = 1;
        spinner2.setValue(vue2);
        c.anchor = GridBagConstraints.CENTER;
        c.gridx = 0;
        c.gridy = 3;
        frame.add(spinner2, c);

        // spinner check for TMax > Tmin always
        spinner1.addChangeListener(new ChangeListener() {
            @Override
            public void stateChanged(ChangeEvent e) {
                int TMax = (Integer) spinner1.getValue();
                int TMin = (Integer) spinner2.getValue();
                if (TMax < TMin){
                    spinner1.setValue(spinner2.getValue());
                }
            }

        });

        spinner2.addChangeListener(new ChangeListener() {
            @Override
            public void stateChanged(ChangeEvent e) {
                int TMax = (Integer) spinner1.getValue();
                int TMin = (Integer) spinner2.getValue();
                if (TMax < TMin){
                    spinner2.setValue(spinner1.getValue());
                }
            }

        });


        //button add
        JButton button1 = new JButton("START");
        button1.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                globalCustomer.setStatus(1);
            }
        } );
        c.anchor = GridBagConstraints.LINE_START;
        c.gridx = 0;
        c.gridy = 4;
        frame.add(button1, c);

        JButton button2 = new JButton("PAUSE");
        button2.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                globalCustomer.setStatus(0);
            }
        } );
        c.anchor = GridBagConstraints.LINE_START;
        c.gridx = 1;
        c.gridy = 4;
        frame.add(button2, c);

        JButton button3 = new JButton("EXIT");
        button3.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.exit(0);
            }
        } );
        c.anchor = GridBagConstraints.LINE_START;
        c.gridx = 2;
        c.gridy = 4;
        frame.add(button3, c);

        frame.pack();
        frame.setVisible(true);


        Customer customer = new Customer();
        globalCustomer = customer;
        setTimer(customer, model, spinner1, spinner2, labelPic1, labelPic2, labelPic3, labelPic4, labelPic5);
    }

    private static ImageIcon getScaledImage(String path, int x, int y){
        ImageIcon imageIcon = new ImageIcon(path); // load the image to a imageIcon
        Image image = imageIcon.getImage(); // transform it
        Image newimg = image.getScaledInstance(x, y, java.awt.Image.SCALE_SMOOTH); // scale it the smooth way
        imageIcon = new ImageIcon(newimg);

        return imageIcon;
    }

    private static void setTimer(Customer customer, DefaultTableModel model, JSpinner spinner1, JSpinner spinner2, JLabel labelPic1, JLabel labelPic2, JLabel labelPic3, JLabel labelPic4, JLabel labelPic5){
        // set timer
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                // Your database code here
                doStuff(customer, model, spinner1, spinner2, labelPic1, labelPic2, labelPic3, labelPic4, labelPic5); // into timer and do this function every 1000ms
            }
        },0, 1000);

    }

    private static void doStuff(Customer customer, DefaultTableModel model, JSpinner spinner1, JSpinner spinner2, JLabel labelPic1, JLabel labelPic2, JLabel labelPic3, JLabel labelPic4, JLabel labelPic5){
        int value1 = (Integer) spinner1.getValue();
        int value2 = (Integer) spinner2.getValue();
        customer.setTmax(value1);
        customer.setTmin(value2);
        customer.CustomerOnChair();
        List<Integer> customerAr = new ArrayList<>();
        customerAr = (List) customer.getClientsArray();
        if (customerAr != null){
            switch (customerAr.size()){
                case 0: {
                    labelPic1.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
                    labelPic2.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
                    labelPic3.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
                    labelPic4.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
                    labelPic5.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
                } break;
                case 1: {
                    labelPic1.setIcon(getScaledImage("/home/amishi/cust.jpg", 70, 70));
                    labelPic2.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
                    labelPic3.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
                    labelPic4.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
                    labelPic5.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
                } break;
                case 2: {
                    labelPic1.setIcon(getScaledImage("/home/amishi/cust.jpg", 70, 70));
                    labelPic2.setIcon(getScaledImage("/home/amishi/cust.jpg", 70, 70));
                    labelPic3.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
                    labelPic4.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
                    labelPic5.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
                } break;
                case 3: {
                    labelPic1.setIcon(getScaledImage("/home/amishi/cust.jpg", 70, 70));
                    labelPic2.setIcon(getScaledImage("/home/amishi/cust.jpg", 70, 70));
                    labelPic3.setIcon(getScaledImage("/home/amishi/cust.jpg", 70, 70));
                    labelPic4.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
                    labelPic5.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
                } break;
                case 4: {
                    labelPic1.setIcon(getScaledImage("/home/amishi/cust.jpg", 70, 70));
                    labelPic2.setIcon(getScaledImage("/home/amishi/cust.jpg", 70, 70));
                    labelPic3.setIcon(getScaledImage("/home/amishi/cust.jpg", 70, 70));
                    labelPic4.setIcon(getScaledImage("/home/amishi/cust.jpg", 70, 70));
                    labelPic5.setIcon(getScaledImage("/home/amishi/176847538_s265.jpg", 70, 70));
                } break;
                case 5: {
                    labelPic1.setIcon(getScaledImage("/home/amishi/cust.jpg", 70, 70));
                    labelPic2.setIcon(getScaledImage("/home/amishi/cust.jpg", 70, 70));
                    labelPic3.setIcon(getScaledImage("/home/amishi/cust.jpg", 70, 70));
                    labelPic4.setIcon(getScaledImage("/home/amishi/cust.jpg", 70, 70));
                    labelPic5.setIcon(getScaledImage("/home/amishi/cust.jpg", 70, 70));
                } break;
            }
        }

        if (customer.isClietnHasArrived()){
            model.addColumn("", new Object[]{customer.getNka(), customer.getLastRandomTime()});
        }

    }



}

